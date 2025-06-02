require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CounterSchema = new mongoose.Schema({
  value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", CounterSchema);

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

app.get("/api/increment", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter({ value: 1 });
    } else {
      counter.value += 1;
    }
    await counter.save();
    res.json({ counter: counter.value });
  } catch (err) {
    console.error("Error incrementing counter:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API listening at http://0.0.0.0:${port}`);
});
