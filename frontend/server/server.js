import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// API route
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ? AND role = ?",
    [email, password, role],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0) {
        res.json({ message: "Login successful", user: results[0] });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Backend running on http://localhost:${process.env.PORT}`)
);
