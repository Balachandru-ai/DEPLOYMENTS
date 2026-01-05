const express = require("express");
const db = require("./db");

const app = express();

/* ✅ middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ POST: save deployment */
app.post("/api/deploy", (req, res) => {
  const { git_repo, image_name, image_tag, container_name } = req.body;

  if (!git_repo || !image_name || !image_tag || !container_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO deployments (git_repo, image_name, image_tag, container_name)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [git_repo, image_name, image_tag, container_name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ status: "saved", id: this.lastID });
  });
});

/* ✅ GET: list deployments */
app.get("/api/deploy", (req, res) => {
  db.all(`SELECT * FROM deployments ORDER BY id DESC`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/* ✅ VERY IMPORTANT */
app.listen(3000, "0.0.0.0", () => {
  console.log("Backend running on port 3000");
});
