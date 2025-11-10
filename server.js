const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const cookieParser = require('cookie-parser');
const participant = require('./models/participant');

// Connect to MongoDB Atlas
// const DB_URI = process.env.DB_URI;

// Mongo database for local testing
const DB_URI = 'mongodb+srv://joshgoldbloom_db_user:wptM2pzeDv1sRhsC@testcluster.9fi7mrs.mongodb.net/?appName=TestCluster';


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


//Register a participant route
app.post('/register', async (req, res) => {

    // Get participant Id and password from text fields to register a new participant
    const { participantId, password } = req.body;
    console.log('Received data:', req.body);

    //Hashes the incoming password to place in the database
    bcrypt.hash(password.trim(), 8)
    .then(hash => {

        // Places new participant in the database
        participant.create({participantId: Number(participantId),  password: hash})
            .then(user => {
                res.json({status: 'OK'});
            })
            .catch(err => {
                console.error('Error creating user:', err);
                res.json(err)
            });
    }).catch(err => res.json(err));
})

app.post('/signin', async (req, res) => {

    // Take participantId and password out of the text fields for sign-in
    const { participantId, password } = req.body;
    console.log('Received data:', req.body);

    // Finds existing participant in database base off participantId
    const user= await participant.findOne({participantId: Number(participantId)});

        if (!user) {
            console.log('User Not Found');
            return res.json('User Not Found');
        }
        else {

            // Compare hash of database password to hash of entered password
            bcrypt.compare(password, user.password, (err, response) => {

                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json('Internal error');
                }

                if (response) {
                    //Assign the jwt and respond with the jwt
                    const token = jwt.sign({id: participantId},
                        'jwt-secret-key', {expiresIn: '180d'});
                    return res.json({status: 'Success', token: token});

                }
                else{
                    return res.json('Incorrect password');
                }
            })
          }
       })

// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});