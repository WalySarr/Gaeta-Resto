import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;
    let userId; 

    if (token) {
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = token_decode.id;
            next();
        } catch (error) {
            console.log('Error in the authentication middleware', error);
            return res.json({
                success: false,
                message: 'Error in the authentication middleware',
            });
        }
    } else {
        next();
    }
};

export default authMiddleware;
