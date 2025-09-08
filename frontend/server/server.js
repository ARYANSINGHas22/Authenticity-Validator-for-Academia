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

app.post("/api/institutions", (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ success: false, message: "Name and type are required" });
  }

  const certificates = 0;
  const status = "Pending Review";

  db.query(
    "INSERT INTO Institutions (name, type, certificates, status) VALUES (?, ?, ?, ?)",
    [name, type, certificates, status],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({
        success: true,
        institution: {
          id: result.insertId,
          name,
          type,
          certificates,
          status
        }
      });
    }
  );
});

app.put("/api/institutions/:id/suspend", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Institutions SET status = 'Suspended' WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Database error" });
      res.json({ success: true, message: "Institution suspended" });
    }
  );
});

// Edit institution (name/type)
app.put("/api/institutions/:id", (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ success: false, message: "Name and type are required" });
  }

  db.query(
    "UPDATE Institutions SET name = ?, type = ? WHERE id = ?",
    [name, type, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "Institution updated" });
    }
  );
});

// Unsuspend institution
app.put("/api/institutions/:id/unsuspend", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Institutions SET status = 'Active' WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "Institution unsuspended" });
    }
  );
});


app.get("/api/institutions", (req, res) => {
  db.query("SELECT * FROM Institutions", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json(results);
  });
});


app.get("/api/stats", (req, res) => {
  const stats = {};

  // Count institutions
  db.query("SELECT COUNT(*) AS totalInstitutions FROM Institutions", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    stats.totalInstitutions = results[0].totalInstitutions;

    // Count suspended institutions
    db.query("SELECT COUNT(*) AS suspendedInstitutions FROM Institutions WHERE status = 'Suspended'", (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      stats.suspendedInstitutions = results[0].suspendedInstitutions;

      // Count certificates
      db.query("SELECT COUNT(*) AS totalCertificates FROM Certificate", (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        stats.totalCertificates = results[0].totalCertificates;

        res.json(stats);
      });
    });
  });
});


app.get("/api/system-status", (req, res) => {
  // Check database connection
  db.ping((err) => {
    const dbStatus = err ? { status: "Offline", color: "red" } : { status: "Online", color: "green" };

    // For simplicity, hardcode other services for now
    const status = [
      { name: "OCR Processing", status: "Online", color: "green" },
      { name: "Database", ...dbStatus },
      { name: "Blockchain Registry", status: "Syncing", color: "orange" },
      { name: "Alert System", status: "Online", color: "green" },
    ];

    res.json(status);
  });
});



app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
