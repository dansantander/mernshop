import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
// we won't seed orders, because order population will be done from
// the front-end, but we do wanna import orders here to be able
// to destroy orders from all of the users we have in our db
// including those who where seeded
import Order from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// this is asynchronous cause we're dealing with the DB
// so everything returns a promise
const importData = async () => {
  try {
    // We first wipe everything from our DB
    // so that when we import, everything is clean.
    // To delete everything we pass no argument to deleteMany.
    // It returns a promise, so we add 'await' before it.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Now we insert the users into our User model.
    // This will be an array
    const createdUsers = await User.insertMany(users);

    //We grab the first user which is the admin
    const adminUser = createdUsers[0]._id;
    
    // And we set it as the creator of the products we'll seed
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    // Now we insert the products into our Product model.
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!')
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!')
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
}

if(process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}