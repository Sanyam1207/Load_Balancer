const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async(req, res) => {
    try {
        const {name, email, password, username} = req.body;
        console.log(`name and email : : : ${name} ${email}`);
        
        const user = await userModel.findOne({email});

        if (user) {
            return res.status(409).json({message: "Email already exists", success: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            username: username
        })

        console.log(`Creaated User is : : ${createdUser}`);
        

        createdUser.save()

        res.status(201).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error In creating user",
            success: false
        })
    }
}

const login = async(req, res) => {
    try {
        console.log("entering try blocksa ashdvas");
        
        const {email, password} = req.body;
        console.log(`name and email : : : ${email}`);
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(403).json({message: "User Does Not Exist Please signup to continue or the creadentials are wrong", success: false});
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({message: "User creadentials are wrong", success: false});
        }

        const secret = "Iamfeelinggoodyeah";
        const jwtToken = jwt.sign({
            email: user.email,
            _id: user._id
        }, secret, {
            expiresIn: "1h"
        })

        console.log(`\n\nToken is : : ${jwtToken}\n\n `);
        

        res.status(200).json({
            message: "Login Successfull",
            success: true,
            token: jwtToken,
            email: user.email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error In logging in",
            success: false
        })
    }
}

module.exports = {signup, login};