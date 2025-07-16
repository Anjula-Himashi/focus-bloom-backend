const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

app.use(express.json());

// EDIT THIS: Put your real credentials here
const pool = new Pool({
  user: "postgres",         // your username
  host: "localhost",
  database: "postgres",     // default database
  password: "Ucsc.Cs.", // your password
  port: 5432,
});

// Test API to check DB connection
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ serverTime: result.rows[0].now });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
