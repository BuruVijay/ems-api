import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import dotenv from 'dotenv';
dotenv.config();

const verifyUser=async (req,res,next)=>{

    try {
        const token=req.headers.authorization.split(' ')[1];
        if(!token)
        {
            return res.status(404).json({success:false,error:"Token Not Provided"})
        }

        const decoded= jwt.verify(token,process.env.JWT_KEY);
        if(!decoded) {
            return res.status(404).json({success:false,error:"Invalid Token"})
        }

        const user=await User.findById(decoded._id).select('-password')

        if(!user) {
            return res.status(404).json({success:false,error:"User Not Found"})
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(500).json({success:false,error:"Server error"})
    }
}

export default verifyUser