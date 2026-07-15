
CREATE TABLE IF NOT EXISTS artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);


CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    listens INTEGER DEFAULT 0,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);



INSERT INTO artists (name, genre, monthly_listeners) VALUES ('Eminem', 'Hip Hop', 65000000);
INSERT INTO artists (name, genre, monthly_listeners) VALUES ('Oasis', 'Britpop', 20000000);


INSERT INTO albums (name, release_year, listens, artist_id) VALUES ('The Eminem Show', 2003, 1200000, 1);
INSERT INTO albums (name, release_year, listens, artist_id) VALUES ('Recovery', 2010, 950000, 1);
INSERT INTO albums (name, release_year, listens, artist_id) VALUES ('Kamikaze', 2018, 700000, 1);


INSERT INTO albums (name, release_year, listens, artist_id) VALUES ('Definitely Maybe', 1994, 850000, 2);
INSERT INTO albums (name, release_year, listens, artist_id) VALUES ('Whats the Story Morning Glory', 1995, 1500000, 2);


INSERT INTO songs (name, release_year, album_id) VALUES ('Without Me', 2002, 1);
INSERT INTO songs (name, release_year, album_id) VALUES ('Lose Yourself', 2003, 1);
INSERT INTO songs (name, release_year, album_id) VALUES ('Not Afraid', 2010, 2);
INSERT INTO songs (name, release_year, album_id) VALUES ('The Monster', 2012, 2);
INSERT INTO songs (name, release_year, album_id) VALUES ('Higher', 2020, 3);


INSERT INTO songs (name, release_year, album_id) VALUES ('Slide Away', 1994, 4);
INSERT INTO songs (name, release_year, album_id) VALUES ('Supersonic', 1994, 4);
INSERT INTO songs (name, release_year, album_id) VALUES ('Wonderwall', 1995, 5);
INSERT INTO songs (name, release_year, album_id) VALUES ('Roll With It', 1995, 5);
INSERT INTO songs (name, release_year, album_id) VALUES ('Magic Pie', 1997, 5);