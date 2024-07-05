const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors');
const userRoutes = require('./src/routes/usersRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');



// Middlewares
app.use(cors());
app.use(express.json());



// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes)
app.use('/admin', adminRoutes);
app.use('/categories', categoriesRoutes);
app.use('/orders', ordersRoutes);


app.use('/', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})