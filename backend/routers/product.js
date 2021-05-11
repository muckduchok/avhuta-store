import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/product.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler( async(req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));

productRouter.get('/:id', expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Продукт не найден'});
    }
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler (async (req, res) => {
    const product = new Product({
      name: 'sample name ' + Date.now(),
      image: 'https://www.roznica.com.ua/rf/th/400x320/69/804798.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      instock: true,
      raiting: 3,
      numReviews: 0,
      descr: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Продукт создан', product: createdProduct});
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler (async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.instock = req.body.instock;
        product.descr = req.body.descr;
        const updatedProduct = await product.save();
        
        res.send({message: 'Товар обновлен', product: updatedProduct});
    } else {
        res.status(404).send({message: "Товара не найдено"});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({message: 'Товар удален', product: deleteProduct});
    } else {
        res.status(404).send({message: 'Товар не найден'});
    }
}));

export default productRouter;