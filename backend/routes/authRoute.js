const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const participant = require('../models/participant')
const bcrypt = require('bcrypt');

//Register a participant route
router.post('/register', async (req, res) => {

    // Get participant Id and password from text fields to register a new participant
    const { participantId, password } = req.body;
    console.log('Received data:', req.body);

    try {
        const userExists = await participant.findOne({participantId});
        if (userExists) return res.status(400).json({message: 'Participant already exists'});
    }

    catch (err) {
        res.status(500).json({ message: 'User already created' });
    }

    //Hashes the incoming password to place in the database
    bcrypt.hash(password.trim(), 8)
        .then(hash => {

            // Places new participant in the database
            participant.create({participantId: Number(participantId),
                password: hash,
                assignedResearcher: req.body.assignedResearcher,
                researcherEmail: req.body.researcherEmail,
                irbApprovalNumber: req.body.irbApprovalNumber,
                study: req.body.study})
                .then(user => {
                    res.json({status: 'Participant Created'});
                })
                .catch(err => {
                    console.error('Error creating user:', err);
                    res.json(err)
                });
        }).catch(err => res.json(err));
})


//POST request to /login       Obtains participantId and password from the request body
router.post('/signin', async (req, res) => {

    // Take participantId and password out of the text fields for sign-in
    const { participantId, password } = req.body;
    console.log('Received data:', req.body);

    // Finds existing participant in database base off participantId
    const user= await participant.findOne({participantId: Number(participantId)});

    if (!user) {
        console.log('User Not Found');
        return res.status(400).json({ message: 'User Not Found' });
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
                const token = jwt.sign({id: user._id},
                    'jwt-secret-key', {expiresIn: '180d'});
                return res.status(200).json({status: 'Successfully Signed In', token: token,
                    user: {id: user._id, participantId: user.participantId}});
            }
            else{
                return res.status(401).json({ message: 'Invalid password' });
            }
        })
    }
})

module.exports = router;
