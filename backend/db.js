const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');


const dbPath = path.join(__dirname, 'data', 'app.db');


if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection error:", err.message);
    } else {
        console.log("✅ Connected to the SQLite database file.");
    }
});

db.serialize(() => {
    const sqlPath = path.join(__dirname, 'model.sql');
    
    if (fs.existsSync(sqlPath)) {
        const sql = fs.readFileSync(sqlPath, 'utf8');
        db.exec(sql, (err) => {
            if (err) console.error("❌ Error running model.sql:", err.message);
            else console.log("✅ Database tables and seed data initialized.");
        });
    } else {
        console.error("❌ model.sql not found! Make sure it is in the backend folder.");
    }
});

module.exports = db;