const express = require('express');
const cors = require('cors');
const db = require('./db'); 


const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');

const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(express.json()); 


app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);


app.get('/', (req, res) => {
    res.send('Music Library API is running!');
});


app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`Ready to handle Artists, Albums, and Songs!`);
});