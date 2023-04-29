const mongoose = require('mongoose');
const config = require('../config');
const Product = require('./Product');
const create = require('./../models/user_model');
const Order = require('./Order');
const Cart = require('./Cart');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('connected');
  })
  .catch((e) => console.log(e));

// run();
// async function run() {
//   try {
// const user = await create('Falko Kammel', 'falkokammel@gmx.de', 'pudding');
// await user.save();

// const user2 = await create('Daniel T', 'dt@ga.co', 'pudding');
// await user2.save();

// const pro1 = new Product({
//   name: 'SWIM MEN LOGO LENGTH - Swimming shorts',
//   description:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque consequatur quibusdam dolorum nemo alias laborum nesciunt, perspiciatis sit labore molestias eum saepe repudiandae a necessitatibus eligendi enim sunt architecto?',
//   price: 22.55,
//   inStock: 300,
//   colors: ['black', 'mint', 'energy blue'],
//   brand: 'Puma',
//   category: 'Clothing',
//   comments: [],
//   rating: 3.5,
//   numReviews: 312,
//   images: [
//     'https://img01.ztat.net/article/spp-media-p1/dd63c92f14613a31bdf582dd407b0893/10be504be6c54b00a33f373979588a4e.jpg?imwidth=1800',
//     'https://img01.ztat.net/article/spp-media-p1/bd48f8dbc1503b438cdeda09bf8ba948/2b8a83018d9d4e6bb92a20d333e4cd2a.jpg?imwidth=1800',
//   ],
// });
// const pro2 = new Product({
//   name: 'Wellies',
//   description:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque consequatur quibusdam dolorum nemo alias laborum nesciunt, perspiciatis sit labore molestias eum saepe repudiandae a necessitatibus eligendi enim sunt architecto?',
//   price: 39.99,
//   inStock: 200,
//   colors: ['black', 'leopard'],
//   brand: 'AUS WOOLI AUSTRALIA',
//   category: 'Shoes',
//   comments: [],
//   rating: 0,
//   numReviews: 0,
//   images: [
//     'https://img01.ztat.net/article/spp-media-p1/8a6980d902b44a959556fe54ebef86ab/f9a8e16d12f444f69c793e73641bb0f7.jpg?imwidth=1800&filter=packshot',
//     'https://img01.ztat.net/article/spp-media-p1/9f085806800542149fac8bf43ef4a61d/914100725ca642579d77ecd9010c0010.jpg?imwidth=1800',
//   ],
// });
// const pro3 = new Product({
//   name: 'APPLE WATCH SE GPS 40MM - Smartwatch',
//   description:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque consequatur quibusdam dolorum nemo alias laborum nesciunt, perspiciatis sit labore molestias eum saepe repudiandae a necessitatibus eligendi enim sunt architecto?',
//   price: 299.0,
//   inStock: 3,
//   colors: ['white'],
//   brand: 'Apple',
//   category: 'Sports',
//   comments: [],
//   rating: 5,
//   numReviews: 27,
//   images: [
//     'https://img01.ztat.net/article/spp-media-p1/db6e4da6e2384caabc990d458ccf30fd/4d514337d7964c1891686e59bf2f8312.jpg?imwidth=1800&filter=packshot',
//     'https://img01.ztat.net/article/spp-media-p1/45489463fd1b482c988c41fa388acc75/e243356b480049cc975b2769b89b43c2.jpg?imwidth=762',
//   ],
// });
// const pro4 = new Product({
//   name: 'AIR PATROL PACK - Backpack',
//   description:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque consequatur quibusdam dolorum nemo alias laborum nesciunt, perspiciatis sit labore molestias eum saepe repudiandae a necessitatibus eligendi enim sunt architecto?',
//   price: 59.99,
//   inStock: 21,
//   colors: ['black'],
//   brand: 'Joardan',
//   category: 'Accessories',
//   comments: [],
//   rating: 5,
//   numReviews: 7,
//   images: [
//     'https://img01.ztat.net/article/spp-media-p1/766f5f50c82b35549c3d9cb3efb76f05/98099ff2739f437b8152459bc4abccbc.jpg?imwidth=1800',
//     'https://img01.ztat.net/article/spp-media-p1/24922a2ec5d535448a3aa65c5a286046/2172989926fa4863bcb00dff8c9da073.jpg?imwidth=1800',
//   ],
// });
// const pro5 = new Product({
//   name: 'Short coat',
//   description:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque consequatur quibusdam dolorum nemo alias laborum nesciunt, perspiciatis sit labore molestias eum saepe repudiandae a necessitatibus eligendi enim sunt architecto?',
//   price: 84.99,
//   inStock: 300,
//   colors: ['black'],
//   brand: 'Threadbare',
//   category: 'Clothing',
//   comments: [],
//   rating: 0,
//   numReviews: 0,
//   images: [
//     'https://img01.ztat.net/article/spp-media-p1/dffab26d7ef93932b1a9024d97e03ad0/1aca36f864a94adabf283d1871863ea9.jpg?imwidth=1800',
//     'https://img01.ztat.net/article/spp-media-p1/ff5d6567df5a3ab1bd570ae093672e39/6ab2e48fe2ab400e9d3075a5a2f4f9bb.jpg?imwidth=1800',
//   ],
// });

// await pro1.save();
// await pro2.save();
// await pro3.save();
// await pro4.save();
// await pro5.save();
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = mongoose;
