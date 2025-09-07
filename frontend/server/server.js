import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2"; // or mongoose if MongoDB
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Allow your frontend origin
  credentials: true
}));

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "maglev.proxy.rlwy.net",
  port: 21040,
  user: "root", // change to your db user
  password: "oneZqLgElNurcTXDzfRpBQMgiWCFZUoG",
  database: "railway",
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


app.post("/api/verify", (req, res) => {
  const { sha256 } = req.body;

  if (!sha256) {
    return res.status(400).json({ message: "SHA ID is required" });
  }

  db.query(
    "SELECT certi_id, C_name FROM Certificate WHERE sha_id = ? LIMIT 1",
    [sha256],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0) {
        res.json({
          found: true,
          data: {
            cert_id: results[0].certi_id,
            student_name: results[0].C_name,
          },
        });
      } else {
        res.json({ found: false, message: "Certificate not found" });
      }
    }
  );
});


app.post("/api/verify-bulk", (req, res) => {
  const { certificates } = req.body; // [{ fileName, sha256 }]

  if (!certificates || !Array.isArray(certificates)) {
    return res.status(400).json({ message: "Certificates array required" });
  }

  const results = [];
  let completed = 0;

  certificates.forEach(({ fileName, sha256 }) => {
    db.query(
      "SELECT certi_id, C_name FROM Certificate WHERE sha_id = ? LIMIT 1",
      [sha256],
      (err, rows) => {
        completed++;

        if (err) {
          results.push({
            fileName,
            found: false,
            message: "Server error",
          });
        } else if (rows.length > 0) {
          results.push({
            fileName,
            found: true,
            data: {
              cert_id: rows[0].certi_id,
              student_name: rows[0].C_name,
            },
          });
        } else {
          results.push({
            fileName,
            found: false,
            message: "Certificate not found",
          });
        }

        // When all queries finish → return
        if (completed === certificates.length) {
          res.json(results);
        }
      }
    );
  });
});


app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
