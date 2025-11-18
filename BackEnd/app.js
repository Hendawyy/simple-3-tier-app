const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/counter";
let db, counterCollection;

// Initialize MongoDB connection
async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
    counterCollection = db.collection('counter');
    
    // Initialize counter if it doesn't exist
    const existingCounter = await counterCollection.findOne({ _id: "mainCounter" });
    if (!existingCounter) {
      await counterCollection.insertOne({ _id: "mainCounter", value: 0 });
    }
    
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// Atomic increment using MongoDB findOneAndUpdate
app.get("/api/increment", async (req, res) => {
  try {
    const result = await counterCollection.findOneAndUpdate(
      { _id: "mainCounter" },
      { $inc: { value: 1 } },
      { 
        returnDocument: 'after',
        upsert: true 
      }
    );
    
    res.json({ counter: result.value });
  } catch (error) {
    console.error("Error incrementing counter:", error);
    res.status(500).json({ error: "Failed to increment counter" });
  }
});

// Get current counter value
app.get("/api/counter", async (req, res) => {
  try {
    const result = await counterCollection.findOne({ _id: "mainCounter" });
    res.json({ counter: result ? result.value : 0 });
  } catch (error) {
    console.error("Error getting counter:", error);
    res.status(500).json({ error: "Failed to get counter" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Start server after MongoDB connection
connectToMongo().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Backend API listening at http://0.0.0.0:${port}`);
  });
});
