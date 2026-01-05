const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/api/deploy', (req, res) => {
  const { git_repo, image_name, image_tag, container_name } = req.body;

  db.run(
    `INSERT INTO deployments VALUES (NULL, ?, ?, ?, ?, datetime('now'))`,
    [git_repo, image_name, image_tag, container_name],
    () => res.json({ status: "saved" })
  );
});

app.get('/api/deploy', (req, res) => {
  db.all(`SELECT * FROM deployments ORDER BY id DESC`, (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
