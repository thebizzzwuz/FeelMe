    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');

    // Connect to MongoDB Atlas
    const DB_URI = 'mongodb+srv://Josh:nI94iJYsxIBUJ5za@feelmeapp.dxrdzpx.mongodb.net/feelme_app?appName=feelmeapp';

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
    
    const authRoute = require('./routes/authRoute')
    app.use('/api/auth', authRoute);

    const participantRoute = require('./routes/participantRoute');
    app.use('/api/participant', participantRoute);

    const studyRoute = require('./routes/studyRoute');
    app.use('/api/study', studyRoute);

    const participantFromStudy = require('./routes/participantfromstudy')
    app.use('/api/partfromstudy', participantFromStudy);

    const logRoutes = require('./routes/logRoute');
    app.use('/api/logs', logRoutes);

    app.get('/', (req, res) => {
        res.send('Backend is running!');
    });

    // 3. Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(3000, "0.0.0.0", () => {
        console.log(`Server is running on 0.0.0.0:3000`);
    });