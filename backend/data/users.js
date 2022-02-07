import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Lyndon Chicken',
    email: 'lyndon@example.com',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
    Restaurant: [{
      name: 'Jollibee',
      image: '/img/src',
      address: 'quezon city',
      url:'/jollibee',
      rating: 4.0,
      numReviews: 12,
      Products: [
        {
          name: 'yum',
          image: '/sample',
          category: 'burgers',
          countInstock: 12,
          price: 35.50
        },
        {
          name: 'spaghetti',
          image: '/sample',
          category: 'dessert',
          countInstock: 12,
          price: 35.50
        }
      ]
    }]
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
