import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import secretKey from './crypto.js';

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Session
app.use(
    session({
        secret: secretKey, // Clé secrète pour signer la session ID cookie
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware pour vérifier ou créer un identifiant unique pour l'utilisateur
// app.use((req, res, next) => {
//     if (!req.cookies.user_id) {
//         const userId = uuidv4();
//         res.cookie('user_id', userId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 an
//         req.userId = userId;
//     } else {
//         req.userId = req.cookies.user_id;
//     }
//     next();
// });

// DB connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// API Testing
app.get('/', (req, res) => {
    res.send('API Working');
});

// Listening Port
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
