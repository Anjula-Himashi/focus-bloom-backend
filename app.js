// const express = require("express");
// const { Client } = require("pg");

// const app = express();
// const port = 3000;

// // Create a PostgreSQL client
// const con = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Ucsc.Cs.",
//   database: "focus_bloom",
// });

// // Connect once when the server starts
// con.connect()
//   .then(() => console.log("Connected to the database"))
//   .catch(err => console.error("Connection error:", err));

// // API endpoint to get all users
// app.get("/api/users", async (req, res) => {
//   try {
//     const result = await con.query("SELECT * FROM user_table");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Query error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});
