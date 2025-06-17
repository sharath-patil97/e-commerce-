// app.js
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authenticateToken = require('./middleware/authMiddleware');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is working!');
});



app.use('/api/auth', authRoutes);

// app.use(authenticateToken) pass authentic token '/api/products' down
app.use('/api/products', productRoutes);

// app.use(express.json());

app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);


// app.use('/api/payments', paymentRoutes);






module.exports = app;
