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

const User = mongoose.model('User', userSchema);

export default User;