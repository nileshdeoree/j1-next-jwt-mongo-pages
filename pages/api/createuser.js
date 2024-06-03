import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ message: "This method is not allowed" })
    }
    
    let success = false;

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export default connectDb(handler);
