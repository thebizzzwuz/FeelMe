const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");

// Connect to MongoDB Atlas
// const DB_URI = process.env.DB_URI;

// Mongo database for local testing
const DB_URI = 'mongodb+srv://Josh:nI94iJYsxIBUJ5za@feelmeapp.dxrdzpx.mongodb.net/?appName=feelmeapp';


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
app.use(cookieParser());

// Import routes here

app.use('/', authRoutes);

// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});