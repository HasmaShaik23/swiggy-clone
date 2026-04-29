// Central data file for all restaurants with real food images
export const restaurantsData = {
  1: {
    id: 1,
    name: "House of Candy",
    cuisine: "Desserts",
    location: "Express Avenue Mall, Royapettah, Chennai",
    price: 500,
    distance: "1.5 km",
    rating: 4.5,
    offer: "Get 25% off on pre-booking",
    deliveryTime: "25-30 min",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
    menu: [
      { id: 101, name: "Chocolate Cake", description: "Rich chocolate cake with ganache frosting", price: 250, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150", category: "Cakes" },
      { id: 102, name: "Red Velvet Cake", description: "Cream cheese layered red velvet", price: 280, image: "https://tse1.mm.bing.net/th/id/OIP.ujrnjlMXflFbMs2_MSSDBAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Cakes" },
      { id: 103, name: "Ice Cream Sundae", description: "Vanilla ice cream with chocolate sauce", price: 180, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=150", category: "Ice Cream" },
      { id: 104, name: "Brownie", description: "Warm brownie with nuts", price: 120, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150", category: "Desserts" }
    ]
  },
  2: {
    id: 2,
    name: "The Great Kebab Factory",
    cuisine: "Mughlai",
    location: "Radisson Hotel, Egmore, Chennai",
    price: 1200,
    distance: "3.2 km",
    rating: 4.8,
    offer: "Buy 1 Get 1 Free on Buffet",
    deliveryTime: "35-40 min",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    menu: [
      { id: 201, name: "Seekh Kebab", description: "Minced lamb seekh kebab", price: 350, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=150", category: "Starters" },
      { id: 202, name: "Chicken Tikka", description: "Grilled chicken tikka", price: 320, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=150", category: "Starters" },
      { id: 203, name: "Butter Chicken", description: "Creamy tomato gravy chicken", price: 450, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=150", category: "Main Course" },
      { id: 204, name: "Garlic Naan", description: "Soft garlic naan", price: 60, image: "https://tse3.mm.bing.net/th/id/OIP._wDwLygfiBUIKggMxpgquQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Breads" }
    ]
  },
  3: {
    id: 3,
    name: "Copper Chimney",
    cuisine: "North Indian",
    location: "Nungambakkam, Chennai",
    price: 900,
    distance: "2.1 km",
    rating: 4.6,
    offer: "20% off on total bill",
    deliveryTime: "30-35 min",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    menu: [
      { id: 301, name: "Paneer Butter Masala", description: "Creamy paneer curry", price: 280, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=150", category: "Main Course" },
      { id: 302, name: "Dal Makhani", description: "Black lentils slow cooked", price: 220, image: "https://th.bing.com/th/id/OIP.cO1N7ff2Vp2wt98Yx39JcwHaLG?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Main Course" },
      { id: 303, name: "Veg Biryani", description: "Fragrant vegetable biryani", price: 250, image: "https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg", category: "Biryani" },
      { id: 304, name: "Gulab Jamun", description: "Soft sweet dumplings", price: 120, image: "https://as2.ftcdn.net/v2/jpg/08/94/76/25/1000_F_894762571_KXz2mTpbcjHRGMg48iiU4CnI9v7La4EN.jpg", category: "Desserts" }
    ]
  },
  4: {
    id: 4,
    name: "Dosa.in",
    cuisine: "South Indian",
    location: "Coconut Tawa, Chennai",
    price: 250,
    distance: "0.9 km",
    rating: 4.4,
    offer: "Get 10% off on pre-booking",
    deliveryTime: "15-20 min",
    imageUrl: "https://th.bing.com/th/id/OIP.L0_XljdUB8R9mz2YXhRZPAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    menu: [
      { id: 401, name: "Masala Dosa", description: "Crispy dosa with potato filling", price: 80, image: "https://i.pinimg.com/originals/e8/dc/7f/e8dc7f0b59b8602ba30621dee3c6291c.jpg", category: "Dosa" },
      { id: 402, name: "Idli Sambar", description: "Soft idli with sambar", price: 60, image: "https://th.bing.com/th/id/OIP.0tDQ-pO5qgh4jquSXqLxpwHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Idli" },
      { id: 403, name: "Vada", description: "Crispy vada with chutney", price: 50, image: "https://static.vecteezy.com/system/resources/previews/015/933/775/large_2x/sambar-vada-or-medu-vadai-with-sambhar-and-chutney-popular-south-indian-snack-or-breakfast-free-photo.jpg", category: "Starters" }
    ]
  },
  5: {
    id: 5,
    name: "Me.Burger",
    cuisine: "Burgers, Fast Food",
    location: "Park Tower, Chennai",
    price: 400,
    distance: "2.2 km",
    rating: 4.6,
    offer: "Get 20% off on pre-booking",
    deliveryTime: "20-25 min",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    menu: [
      { id: 501, name: "Veg Burger", description: "Crispy veg patty burger", price: 99, image: "https://i.pinimg.com/originals/88/70/43/8870437f007cfc8dedb7580ef9e9d911.jpg", category: "Burgers" },
      { id: 502, name: "Chicken Burger", description: "Grilled chicken burger", price: 149, image: "https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg", category: "Burgers" },
      { id: 503, name: "French Fries", description: "Crispy golden fries", price: 79, image: "https://goldenfingers.us/wp-content/uploads/2020/03/french_fry.jpg", category: "Sides" }
    ]
  }
};

export const restaurantsList = Object.values(restaurantsData);