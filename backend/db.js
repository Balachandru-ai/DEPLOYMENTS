const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", () => {
  console.log("SQLite DB connected");
});

db.run(`
  CREATE TABLE IF NOT EXISTS deployments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    git_repo TEXT,
    image_name TEXT,
    image_tag TEXT,
    container_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
