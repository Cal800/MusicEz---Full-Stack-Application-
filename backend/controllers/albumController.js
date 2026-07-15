const db = require('../db');


exports.getAllAlbums = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


exports.createAlbum = (req, res) => {
    const { name, release_year, listens, artist_id } = req.body;
    const sql = "INSERT INTO albums (name, release_year, listens, artist_id) VALUES (?, ?, ?, ?)";
    
    db.run(sql, [name, release_year, listens, artist_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
      
        res.status(201).json({ id: this.lastID });
    });
};


exports.deleteAlbum = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM albums WHERE id = ?", id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
};

exports.updateAlbum = (req, res) => {
    const { id } = req.params;
    const { name, release_year, artist_id } = req.body;
    db.run(
        "UPDATE albums SET name = ?, release_year = ?, artist_id = ? WHERE id = ?",
        [name, release_year, artist_id, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

exports.getOneAlbum = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM albums WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};