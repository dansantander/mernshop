import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// Here we are creating a model method to check if user has
// a valid password.
// The name could be whatever we want but we named it matchPassword
userSchema.methods.matchPassword = async function(enteredPassword) {
  // this.password is the password for a specific insantiated user
  return await bcrypt.compare(enteredPassword, this.password);
}
// This next function will automatically run before a user is saved
// that meanse we don´t have to call it manually elsewhere
userSchema.pre('save', async function(next) {
  // We skip everything outside the if and return
  // from this function by using next() if the password field
  // (and only the password field) has NOT been modified
  // password update will be an option for the user in his profile
  // so we don't wanna encrypt it in that case
  // cause encryption will cause password to not match
  if(!this.isModified('password')) {
    next();
  }

  // If password field is modified or created, we encrypt it:
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const User = mongoose.model('User', userSchema);

export default User;