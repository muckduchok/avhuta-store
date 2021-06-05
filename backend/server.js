import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';
import orderRouter from './routers/order.js';
import uploadRouter from './routers/upload.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/avhuta-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const port = process.env.PORT || 5000;

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/stripe', (req, res) => {
    res.send(process.env.STRIPE_SECRET_KEY || 'sb');
});
app.get('/api/config/liqpay', (req, res) => {
    res.send(process.env.LIQPAY_SECRET_KEY && process.env.LIQPAY_PUBLISH_KEY || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});