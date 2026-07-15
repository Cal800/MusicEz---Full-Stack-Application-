const API_URL = "http://localhost:5000";

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    if (id === 'artists') fetchArtists();
    if (id === 'albums') fetchAlbums();
    if (id === 'songs') fetchSongs();
}

async function fetchArtists() {
    const res = await fetch(`${API_URL}/artists`);
    const data = await res.json();
    const tbody = document.querySelector('#artistTable tbody');
    tbody.innerHTML = data.map(a => `
        <tr>
            <td>${a.id}</td>
            <td>${a.name}</td>
            <td>${a.genre}</td>
            <td>${a.monthly_listeners}</td>
            <td>
                <div class="action-btns">
                    <span class="edit-link" onclick="editArtist(${a.id})">Edit</span>
                    <button class="delete-btn" onclick="deleteItem('artists', ${a.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function fetchAlbums() {
    const res = await fetch(`${API_URL}/albums`);
    const data = await res.json();
    const tbody = document.querySelector('#albumTable tbody');
    tbody.innerHTML = data.map(a => `
        <tr>
            <td>${a.id}</td>
            <td>${a.name}</td>
            <td>${a.release_year}</td>
            <td>${a.artist_id}</td>
            <td>
                <div class="action-btns">
                    <span class="edit-link" onclick="editAlbum(${a.id})">Edit</span>
                    <button class="delete-btn" onclick="deleteItem('albums', ${a.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function fetchSongs() {
    const res = await fetch(`${API_URL}/songs`);
    const data = await res.json();
    const tbody = document.querySelector('#songTable tbody');
    tbody.innerHTML = data.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.release_year}</td>
            <td>${s.album_id}</td>
            <td>
                <div class="action-btns">
                    <span class="edit-link" onclick="editSong(${s.id})">Edit</span>
                    <button class="delete-btn" onclick="deleteItem('songs', ${s.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

document.getElementById('artistForm').onsubmit = async (e) => {
    e.preventDefault();
    const body = {
        name: document.getElementById('artistName').value,
        genre: document.getElementById('artistGenre').value,
        monthly_listeners: document.getElementById('artistListeners').value
    };
    await fetch(`${API_URL}/artists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchArtists();
};

document.getElementById('albumForm').onsubmit = async (e) => {
    e.preventDefault();
    const decks = document.querySelectorAll('.vinyl-input');
    decks.forEach(d => d.classList.add('spinning'));
    setTimeout(() => decks.forEach(d => d.classList.remove('spinning')), 800);

    const body = {
        name: document.getElementById('albumName').value,
        release_year: document.getElementById('albumYear').value,
        artist_id: document.getElementById('artistId').value
    };
    await fetch(`${API_URL}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchAlbums();
};

document.getElementById('songForm').onsubmit = async (e) => {
    e.preventDefault();
    const body = {
        name: document.getElementById('songName').value,
        release_year: document.getElementById('songYear').value,
        album_id: document.getElementById('albumId').value
    };
    await fetch(`${API_URL}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchSongs();
};

async function editArtist(id) {
    const name = prompt("Enter new name:");
    const genre = prompt("Enter new genre:");
    const listeners = prompt("Enter monthly listeners:");
    if (name && genre) {
        await fetch(`${API_URL}/artists/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, genre, monthly_listeners: listeners })
        });
        fetchArtists();
    }
}

async function editAlbum(id) {
    const name = prompt("Enter new album name:");
    const year = prompt("Enter new year:");
    const artistId = prompt("Enter artist ID:");
    if (name) {
        await fetch(`${API_URL}/albums/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, release_year: year, artist_id: artistId })
        });
        fetchAlbums();
    }
}

async function editSong(id) {
    const name = prompt("Enter new song name:");
    const year = prompt("Enter year:");
    const albumId = prompt("Enter album ID:");
    if (name) {
        await fetch(`${API_URL}/songs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, release_year: year, album_id: albumId })
        });
        fetchSongs();
    }
}

async function deleteItem(route, id) {
    if (confirm(`Delete this ${route.slice(0, -1)}?`)) {
        await fetch(`${API_URL}/${route}/${id}`, { method: 'DELETE' });
        if (route === 'artists') fetchArtists();
        if (route === 'albums') fetchAlbums();
        if (route === 'songs') fetchSongs();
    }
}

window.onload = () => showSection('home');