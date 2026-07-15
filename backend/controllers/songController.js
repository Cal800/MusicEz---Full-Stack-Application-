const db = require('../db');

exports.getAllSongs = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getOneSong = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM songs WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.createSong = (req, res) => {
    const { name, release_year, album_id } = req.body;
    const sql = "INSERT INTO songs (name, release_year, album_id) VALUES (?, ?, ?)";
    db.run(sql, [name, release_year, album_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

exports.updateSong = (req, res) => {
    const { id } = req.params;
    const { name, release_year, album_id } = req.body;
    db.run(
        "UPDATE songs SET name = ?, release_year = ?, album_id = ? WHERE id = ?",
        [name, release_year, album_id, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

exports.deleteSong = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM songs WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
};