const {User} = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        const tokenData = {
            id: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWTSecret, { expiresIn: "2h" });
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${user.email}`,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

const Logout = async (req, res) => {
    return res.status(201).cookie("token","",{expiresIn:new Date(Date.now()), httpOnly:true}).json({
        message: "User logged out successfully",
        success: true
    })
}

const Register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "This email is already used",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16)
        await User.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

;
   

module.exports = {Register, Login, Logout};