require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");

// Load environment variables from .env file
var dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB Atlas
const DB_URI = process.env.MONGODB_URI;

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
// study route
const studyRoute = require('./routes/studyRoute');
app.use('/api/study', studyRoute);

app.use('/', authRoutes);
const logRoutes = require('./routes/logRoute');
app.use('/api/logs', logRoutes);

// 3. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});