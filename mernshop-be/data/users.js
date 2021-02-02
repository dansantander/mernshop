/* WE'LL BE USING THIS FILE AS A SEED FOR OUR DB */

import bcrypt from 'bcryptjs';

// we will be using bcryptjs (not bcrypt) for password encryption
// bcryptjs is plain javascript, wheareas plain bcrypt is C++ hence it sometimes
// needs more configuration stuff or causes more crashes

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    // this would normally be asyncronously, but this file is just data being imported so for this is ok.
    // we pass the password and the number of runs which determines how secure our password will be.
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Jhon Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users;