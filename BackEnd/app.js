const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// In-memory counter
let counter = 0;

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

app.get("/api/increment", (req, res) => {
  counter += 1;
  res.json({ counter });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API listening at http://0.0.0.0:${port}`);
});
