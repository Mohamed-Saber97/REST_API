const jwt = require('jsonwebtoken');
const protect = async (req, res, next) => {
    const token = await req.headers.authorization?.split(" ")[1];
    /**
     * t looks for the token in the Authorization header of the request.
     *Example: if the header is Authorization: Bearer abc123, it will extract abc123.
     * The ?. is optional chaining — it avoids errors if authorization is undefined.
     */
    if(!token) {
        res.status(401).json({
            message: 'Not Authorized'
        });
    }
    //verify token
    try {
        /**
         * inside a try block, it tries to verify the token using the secret stored in your .env file under JWT_SECRET.

         * If the token is valid, it gets decoded into a JavaScript object (usually includes user info like ID, email, etc.).
         */
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        //It stores the decoded token data into req.user, so your routes can access user info (like req.user.id) later
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invaild Token'
        });
    }
}

module.exports = protect;