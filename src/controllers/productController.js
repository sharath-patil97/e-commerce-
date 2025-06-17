const Product = require('../models/Product');
const {uploadToCloudinary} = require('../utils/uploadToCloudinary');


const createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create products' });
    }

    // const newProduct = new Product(req.body);
    const { name, description, price, category, stock } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = await uploadToCloudinary(image.buffer);

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: imageUrl
    });
  
    await product.save();

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// const Product = require('../models/Product');

const searchProducts = async (req, res) => {
  // console.log("🔥 searchProducts controller called");
  const { category, priceMin, priceMax, sort, page = 1, limit = 10 } = req.query;
 


  const query = {};

  if (category) {
    query.category = category;
  }

  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = parseInt(priceMin);
    if (priceMax) query.price.$lte = parseInt(priceMax);
  }

  const sortOption = {};
  if (sort) {
    sortOption[sort.replace('-', '')] = sort.startsWith('-') ? -1 : 1;
  }
  console.log({ category, priceMin, priceMax, sort, page, limit });
  console.log("Final Query:", query);


  try {
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    console.error("❌ Error in searchProducts:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { createProduct, getProducts, getProductById,searchProducts };
