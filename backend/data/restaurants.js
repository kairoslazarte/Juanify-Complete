const productsData = [
  {
    name: 'Fried Chicken Special',
    image: '/images/lyndons-chicken.jpg',
    category: 'Ulam',
    price: 150,
    counInStock: 10
  },
  {
    name: 'Sisig Special',
    image: '/images/lyndons-chicken-2.jpg',
    category: 'Ulam',
    price: 120,
    counInStock: 12
  },
  {
    name: 'Burger Shawarma Special',
    image: '/images/lyndons-pata.jpg',
    category: 'Burgers',
    price: 100,
    counInStock: 20
  },
]

const restaurants = [
    {
      name: 'Lyndons',
      image: '/images/lyndons-img.jpg',
      description:
        'This is Lyndons worst ribs',
      products: productsData,
      location: {
        city: 'Davao City',
        long: 7.2536838,
        lat: 125.3109879,
        street: 'Windy Avenue',
        barangay: 'Nagkaisang Nayon',
        zipCode: 1125
      },
      rating: 0,
      numReviews: 0,
    },
]
  
  export default restaurants
  