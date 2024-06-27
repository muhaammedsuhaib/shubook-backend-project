import User from "../Model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import authenticationJoi from "../validation/authJoi.js";

const app = express();
app.use(express.json());

export const signup = async (req, res, next) => {
    try {
      // collect value in body
      const checkJoi = await authenticationJoi.validateAsync(req.body);
      // Checking if this email already exists
      const existsUser = await User.findOne({ email: checkJoi.email });
      if (existsUser) {
        return res.status(409).json({ message: "Email is already registered!" });
      }
  
      //Hashing Password
      const hashedPassword = bcrypt.hashSync(checkJoi.password, 10);
  
      //Add new user
      const newUser = new User({
        email: checkJoi.email,
        password: hashedPassword,
        // profileImg:  req.cloudinaryImageUrl
      });
  
      //Save user
      await newUser.save();
  
      //send response
      return res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      // send serve error response
     return res.status(500).json({ message: "Server error" });
      
    }
  };
  
  export const login = async (req, res, next) => {
    try {
   
      //collect data in body
      const { email, password } = req.body;
      console.log(email,password);
      // check email found or not found
      const user = await User.findOne({ email:email });
       // admin blocking checking
       if (!user) {
         // user not found response send
         return res.status(404).json({ message: "Account not found. Please sign up to get started." });
        }
        if(user.isDeleted === true ) return res.status(403).json({message:"Admin Blocked"});
  
      // check match password
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      // check invalid or valid
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      //jwt setting
      const token = jwt.sign({ id: user._id }, process.env.USER_JWT);
      const { password: hashedPassword, ...data } = user._doc;
      const expiryDate = new Date(Date.now() + 60 * 1000);
  
      //cookie setting
      res
        .cookie("Access_Token", token, { httpOnly: true, expire: expiryDate })
        .status(200)
        .json({message:'User Login success fully',user:data , token});
    } catch (error) {
      // send response server error
      res.status(500).json({ message: "Server error" });
      next(error);
    }
  };

  export const changePassword = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if current password matches
        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        // Hash the new password
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Server error" });
    }
};