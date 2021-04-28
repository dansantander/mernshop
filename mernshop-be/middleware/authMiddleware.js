/*-- This file validates the user token -- */
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler( async (req, res, next) => {
  let token
  // console.log(req.headers.authorization)
  if ( 
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // console.log('have it');
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('token is:', token)
      // jwt.verify will decode the token using our JWT_SECRET
      // so we save that object in a variable "decode"
      // that object looks something like what we have when
      // we check our token in jwt.io page:
      // { id: the user id, iat: somenumber, exp: anothernumber}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded)
      // Next line will return a user by using it's id to find it
      // We use .select('-password') to get the whole user but the password
      // and we assing everything to the request, so when a controller method
      // that uses our protected middleware gets called
      // we'll have that user inside the request and we'll be
      // able to grab its data
      req.user = await User.findById(decoded.id).select('-password');
  
      next();
    } catch(error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
})

export { protect };
