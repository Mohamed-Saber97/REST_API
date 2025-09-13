require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoute');
const app = express();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(express.json());
app.use('/api/user', userRoutes);
const connectDB = require('./config/db');
connectDB();
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);  
});
