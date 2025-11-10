require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    console.error('MongoDB URI is missing.');
    process.exit(1);
}

mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.log('DB Connection Error:', err));

const app = express();

app.use(cors());
app.use(express.json());

// Import routes here
const logRoutes = require('./routes/logRoute');
app.use('/api/logs', logRoutes);

// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});