import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || '';
  const category = req.query.category || '';
  const order = req.query.order || '';
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const raiting = req.query.raiting && Number(req.query.raiting) !== 0
    ? Number(req.query.raiting)
    : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const raitingFilter = raiting ? { raiting: { $gte: raiting } } : {};
  const sortOrder = order === 'lowest'
    ? { price: 1 }
    : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

  const count = await Product.countDocuments({
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...raitingFilter,
  });
  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...raitingFilter,
  }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

  res.send({ products, page, pages: Math.ceil(count / pageSize) });
}));

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Продукт не найден' });
  }
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: `Введите заголовок ${Date.now()}`,
    image: 'https://www.roznica.com.ua/rf/th/400x320/69/804798.jpg',
    price: 0,
    category: 'Категория',
    brand: 'Брэнд',
    countInStock: 0,
    instock: true,
    raiting: 0,
    numReviews: 0,
    descr: 'Короткое описание',
    description: 'Полное описание',
    characteristics: 'Введите характеристики',
  });
  const createdProduct = await product.save();
  res.send({ message: 'Продукт создан', product: createdProduct });
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
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
    product.description = req.body.description;
    product.characteristics = req.body.characteristics;
    const updatedProduct = await product.save();

    res.send({ message: 'Товар обновлен', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Товара не найдено' });
  }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    res.send({ message: 'Товар удален', product: deleteProduct });
  } else {
    res.status(404).send({ message: 'Товар не найден' });
  }
}));

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res.status(400).send({ message: 'Вы уже прокоментировали' });
    }
    const review = {
      name: req.user.name,
      raiting: Number(req.body.raiting),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.raiting = product.reviews.reduce((a, c) => c.raiting + a, 0) / product.reviews.length;
    const updatedProduct = await product.save();

    res.status(201).send({ message: 'Комментарий создан', review: updatedProduct.reviews[updatedProduct.reviews.length - 1] });
  } else {
    res.status(404).send({ message: 'Товара не найдено' });
  }
}));

export default productRouter;
