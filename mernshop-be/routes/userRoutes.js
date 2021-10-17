import express from 'express';
import { authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers  } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

// Remember: Chaining this way means we'll hit the same route ('/') but with different methods
router.route('/').post(registerUser).get(protect, admin, getUsers);

// In this case, we only have one route to login
// so it's ok if we set it this way:
router.post('/login', authUser);
// We use route this time because we will be making a GET request
// for entering the user profile and a PUT request for updating the profile

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;