    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');
    const authRoutes = require("./routes/authRoute");

// Connect to MongoDB Atlas
const DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI)
        .then(() => console.log('Connected to MongoDB Atlas!'))
        .catch(err => console.log('DB Connection Error:', err));

    const app = express();

 app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
    app.use(express.json());
    app.use(cookieParser());

    // Import routes here
    // study route
    
    const authRoute = require('./routes/authRoute')
    app.use('/api/auth', authRoute);

    const participantRoute = require('./routes/participantRoute');
    app.use('/api/participant', participantRoute);

    const studyRoute = require('./routes/studyRoute');
    app.use('/api/study', studyRoute);

    const logRoutes = require('./routes/logRoute');
    app.use('/api/logs', logRoutes);

    app.get('/', (req, res) => {
        res.send('Backend is running!');
    });

    // 3. Start the server
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
