const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/database"); // Path to the middleware file

router.use(connectDB);

router.get("/search", async (req, res) => {
  const query = req.query.q; // Get the search query from the URL parameter
  console.log(query);
  try {
    const productsCollection = req.db.collection("products");

    const searchResults = await productsCollection
      .find({ $text: { $search: query } }, { score: { $meta: "searchScore" } })
      .sort({ score: { $meta: "searchScore" } })
      .toArray();

    res.json({ results: searchResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
