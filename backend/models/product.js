import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
    name: {type: String, required: true, unique: false},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    descr: {type: String, required: true},
    price: {type: Number, required: true},
    instock: {type: Boolean, required: true},
    countInStock: {type: Number, required: true},
    raiting: {type: Number, required: true},
    numReviews: {type: Number, required: true}
}, {
    timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;