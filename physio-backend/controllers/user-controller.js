const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

//register - signup 
const signupUser = async (req,res) => {
    try{
        const { username, email, password, role } = req.body;
        // Check if all fields are provided
        if (!username || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if username or email exists
        const existingUser = await User.findOne({
            where: {
            [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({
            success: false,
            message: 'Username or email already exists'
            });
        }
        // has password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating new User and saving in the database 
        const newlyCreatedUser = await User.create({
            username ,
            email ,
            password : hashedPassword,
            role : role || 'doctor'
        });

        return res.status(201).json({
            success: true,
            message: "New User Created",
            user: newlyCreatedUser
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message  
        });
    }
}

//Login-User

const loginUser = async (req,res) => {
    const { identifier, password } = req.body;

    // Check if all fields are provided
if (!identifier || !password) {
  return res.status(400).json({ message: "Username or email and password are required" });
}

// Step 1: Trim whitespace from identifier
const cleanIdentifier = identifier.trim();

// Step 2: Check if it's an email (contains "@")
const isEmail = cleanIdentifier.includes('@');

    const checkUserData = await User.findOne({
        where: {
          [Op.or]: [
            { email: isEmail ? cleanIdentifier : null },
            { username: isEmail ? null : cleanIdentifier }
          ]
        }
      });

    if(!checkUserData){
      return  res.status(401).json({
            success : false,
            message: "User not found Please signup first"
        });
    }
    //check if password match
    const isPasswordMatch = await bcrypt.compare(password,checkUserData.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        });
    }

    //create user token
    const token = jwt.sign({
        id : checkUserData.id,
        username : checkUserData.username,
        email: checkUserData.email,
        role : checkUserData.role
    },process.env.JWT_SECRET_KEY,{
        expiresIn : '1minutes'
    });
    res.status(201).json({
        success: true,
        message: 'Logged-In Successfully',
        user: {
          id: checkUserData.id,
          username: checkUserData.username,
          email: checkUserData.email,
          role: checkUserData.role
        },
        token
      });
      
}


module.exports = {signupUser,loginUser};