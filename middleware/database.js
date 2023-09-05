const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URL; // Replace with your MongoDB Atlas URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let isConnected = false;

client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    isConnected = true;
    console.log("Connected to the database");
  }
});

const connectDB = (req, res, next) => {
  if (isConnected) {
    req.dbClient = client;
    req.db = client.db("products"); // Replace with your database name
  } else {
    res.status(500).json({ error: "Database connection error" });
    return;
  }

  next();
};

module.exports = connectDB;
