import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Auth the user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler (async (req, res) => {
  const { email, password } = req.body;

  // This was just to check that we have access to the json data
  // we sent from our postman request
  /* res.send({
    email,
    password
  }) */

  const user = await User.findOne({ email: email });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
})

// @desc    User registration
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler (async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.password
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler (async (req, res) => {
  // res.send('success')
  // Since our middleware returns a user in req.user
  console.log('request is', req.user)
  // we just grab the id of that user to find it
  const user = await User.findById(req.user._id);
  //console.log('user', user);

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler (async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

// @desc    Get  all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler (async (req, res) => {

  console.log('Inside getUsers');
  const users = await User.find({});
  console.log('What is users?', users);
  res.json(users);
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers
}