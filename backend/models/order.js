import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true}
    }],
    shippingAddress: {
        fullName: {type: String, required: true},
        country: {type: Number, required: true},
        city: {type: String, required: true},
        address: {type: String, required: true},
        postalCode: {type: String, required: true},
        email: {type: String}
    },
    paymentResult: {id: String, status: String, update_time: String, email_address: String},
    paymentMethod: {type: String, required: true},
    itemsPrice: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;