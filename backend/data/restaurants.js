const productsData = [
  {
      name: 'Fried Chicken From Mars',
      image: '/images/lyndons-fried-chicken-from-mars.jpg',
      category: 'Ulam',
      price: 380,
      countInStock: 10
  },
  {
      name: 'Tadyang Ni Ruby',
      image: '/images/lyndons-tadyang-ni-ruby.jpg',
      category: 'Ulam',
      price: 250,
      countInStock: 12
  },
  {
      name: 'Sauteed wild scallops',
      image: '/images/lyndons-pata.jpg',
      category: 'Ulam',
      price: 250,
      countInStock: 20
  },
  {
      name: 'Crispy Pata',
      image: '/images/lyndons-crispy-pata.jpg',
      category: 'Ulam',
      price: 470,
      countInStock: 20
  },
  {
      name: "Layla's Herbed Whole Fried Chicken",
      image: '/images/lyndons-lylas-herbed-whole-fried-chicken.jpg',
      category: 'Ulam',
      price: 350,
      countInStock: 20
  },
  {
      name: 'Big Eye Tuna Belly',
      image: '/images/lyndons-big-eye-tuna-belly.jpg',
      category: 'Ulam',
      price: 250,
      countInStock: 20
  },
  {
      name: 'Tuna Panga',
      image: '/images/lyndons-tuna-panga.jpg',
      category: 'Ulam',
      price: 55,
      countInStock: 20
  },
  {
      name: "Lyndon's Worlds worst ribs",
      image: '/images/lyndons-worlds-worst-ribs.jpg',
      category: 'Ulam',
      price: 470,
      countInStock: 20
  },
  {
      name: "Layla's awful chicken ",
      image: '/images/lyndons-worlds-worst-ribs.jpg',
      category: 'Ulam',
      price: 140,
      countInStock: 20
  },
  {
      name: "Lyndon's Hot and Spicy Bagaybay",
      image: '/images/lyndons-hot-n-spicy-bagaybay.jpg',
      category: 'Ulam',
      price: 280,
      countInStock: 20
  },
  {
      name: 'Baked Scallops ',
      image: '/images/lyndons-baked-scallops.jpg',
      category: 'Ulam',
      price: 280,
      countInStock: 20
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
  