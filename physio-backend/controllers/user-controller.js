const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register - signup 
const signupUser = async (req,res) => {
    try{
        const {username , password , role} = req.body;
        // check if user exist
        const checkUserData = await User.findOne({where:{username}});
        if(checkUserData){
           return res.status(400).json({
                success : false,
                message : "User is already exist!!!"
            });
        }
        // has password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating new User and saving in the database 
        const newlyCreatedUser = await User.create({
            username ,
            password : hashedPassword,
            role : role || 'user'
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
    const {username,password} = req.body;

    //check if user register/signedup
    const checkUserData = await User.findOne({where : {username}});
    if(!checkUserData){
      return  res.status(401).json({
            success : false,
            message: "User is not register/signedup pls signup "
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
    const accessToken = jwt.sign({
        id : checkUserData.id,
        username : checkUserData.username,
        role : checkUserData.role
    },process.env.JWT_SECRET_KEY,{
        expiresIn : '1h'
    });
    res.status(201).json({
        success : true,
        message : 'Logged-In Successfull',
        role : checkUserData.role,
        accessToken
    });
}


module.exports = {signupUser,loginUser};