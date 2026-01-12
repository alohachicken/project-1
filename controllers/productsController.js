const Product = require("../models/Product");

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      owner: req.user.userId,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("owner", "username") // 👈 THIS LINE IS THE FIX
      .sort({ createdAt: -1 });

    const userId = req.user.id;

    const formatted = products.map(p => ({
      ...p.toObject(),
      isOwner: p.owner && p.owner._id.toString() === userId
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
// GET my products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user.userId,
    }).populate("owner", "username email");

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });

    if (product.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });

    if (product.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};