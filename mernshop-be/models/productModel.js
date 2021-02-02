import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: { //this is the individual review rating
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true // this gives timestamps for created_at 
})

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], // this is an array of review objects
  rating: { // this is the average of all the ratings
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  timestamps: true
})

const Product = mongoose.Model('Product', productSchema);

export default Product;