//crud
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
   try {
    const { name, email, password } = req.body;
    //check if email is exist
    const checkEmail = await User.findOne({email});
    if(checkEmail) {
        return res.status(401).json({
            message: 'Email is already exist'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
     const user = new User({
        name,
        email,
        password: hashedPassword
     });
    await user.save();
    //const token = user.generateAuthToken();
    if(user){
        res.status(201).json({
            message: 'creasted successfully',
            data: user
         });
    }
    else {
        res.status(400).json({
            message: "unable"
        });
    }
   } catch (error) {
        res.status(500).json({
            message: `error occured when add to database ${error}`
        });
   }
};


const loginUser = async (req, res) => {
    try {
        const { name, password} = req.body;
        const checkuser = await User.findOne({name});
        if(!checkuser) {
            return res.status(401).json({
                message : 'username is invaild'
            });
        }
        //compare password
        const checkPassword = await bcrypt.compare(password, checkuser.password);
        if(!checkPassword) {
            return res.status(401).json({
                message : 'password is invaild'
            });
        }
        const token = checkuser.generateAuthToken();
        res.header('x-auth-token', token).status(200).json({
            message: `Welcome ${name}`,
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: `error occured when login ${error}`
        });
    }
};


const getUsers = async (req, res)=> {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit;
        const users = await User.find().skip(skip).limit(limit);
        res.status(200).json({
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: `error occured when get all users ${error}`
        });
    }
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,

};