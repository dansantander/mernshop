import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Once we import productRoutes, we don't need to use the products file
// import products from './data/products.js';

/* 
+++ OLD SYNTAX +++
const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products'); */

dotenv.config()

connectDB();

const app = express();

// Next line will allows to accept json data
// in the request body
app.use(express.json());

app.get('/', (req, res)=> {
  res.send('API is running');
})

/*

+++ We were initially using these routes here, but we moved it to productRoutes
to avoid defining every route in this file +++

app.get('/api/products', (req, res)=> {
  // res.json will convert our javascript products array into json
  res.json(products);
})

app.get('/api/products/:id', (req, res)=> {
  const product = products.find(p => p._id === req.params.id )
  res.json(product);
})

*/

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
