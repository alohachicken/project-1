const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

// CREATE
const upload = require("../middleware/upload");

router.post("/", auth, upload.single("image"), createProduct);

// READ
router.get("/", auth, getAllProducts);
router.get("/mine", auth, getMyProducts);

// UPDATE
router.put("/:id", auth, updateProduct);

// DELETE
router.delete("/:id", auth, deleteProduct);

module.exports = router;