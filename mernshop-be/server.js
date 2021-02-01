const express = require('express');
const products = require('./data/products');

const app = express();

app.get('/', (req, res)=> {
  res.send('API is running');
})

app.get('/api/products', (req, res)=> {
  // res.json will convert our javascript products array into json
  res.json(products);
})

app.get('/api/products/:id', (req, res)=> {
  const product = products.find(p => p._id === req.params.id )
  res.json(product);
})

app.listen(5000, console.log('Serving on port 5000'));
