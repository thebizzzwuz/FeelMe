const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const participant = require("../models/participant")

//Creates token for participant and sets expiration time
const createToken = (participantID) => {
    return jwt.sign({ id: participantID }, process.env.JWT_SECRET, { expiresIn: '180d' });
}

//POST request to /register        Obtains participantId and password from the request body
router.post('/register', async (req, res) => {
    const { participantId, password } = req.body;

    // Tries to find participant in Mongo db database

    try {
        const userExists = await participant.findOne({participantId});
        if (userExists) return res.status(400).json({ message: 'Participant already exists' });

        //If no participant exists, creates one in Mongo db database

        const user = await participant.create({ participantId, password });

        // Response back to user in JSON

        res.status(201).json({
            _id: user._id,
            participantid: user.participantId,
            token: createToken(user._id),
        });

        // Response back to user if an error occurred

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
})

//POST request to /login       Obtains participantId and password from the request body

router.post('/login', async (req, res) => {
    const { participantId, password } = req.body;

    // Finding participant id from Mongo db database

    try {
        const user = await participant.findOne({ participantId });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Response back to user in JSON

        res.json({
            _id: user._id,
            participantid: user.participantId,
            token: createToken(user._id),
        });

        // Response back to user if an error occurred

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});