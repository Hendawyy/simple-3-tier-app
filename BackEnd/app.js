require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Simple in-memory counter (resets on server restart)
let counter = 0;

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

app.get("/api/increment", async (req, res) => {
  try {
    counter += 1;
    res.json({ counter: counter });
  } catch (err) {
    console.error("Error incrementing counter:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API listening at http://0.0.0.0:${port}`);
});
