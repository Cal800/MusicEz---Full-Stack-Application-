const db = require('../db');

exports.getOneArtist = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM artists WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};


exports.updateArtist = (req, res) => {
    const { id } = req.params;
    const { name, genre, monthly_listeners } = req.body;
    db.run(
        "UPDATE artists SET name = ?, genre = ?, monthly_listeners = ? WHERE id = ?",
        [name, genre, monthly_listeners, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};


exports.getAllArtists = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


exports.createArtist = (req, res) => {
    const { name, genre, monthly_listeners } = req.body;
    const sql = "INSERT INTO artists (name, genre, monthly_listeners) VALUES (?, ?, ?)";
    db.run(sql, [name, genre, monthly_listeners], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
};


exports.deleteArtist = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM artists WHERE id = ?", id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
};