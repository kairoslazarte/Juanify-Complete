import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '09063475261',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Lyndon Chicken',
    email: 'lyndon@example.com',
    phone: '09063475262',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '09063475263',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '09063475264',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users