const participant = require('../models/participant')

exports.deleteParticipant = async (req, res) => {
    try {
        const { id } = req.body;

        // Validation checks
        if (!id) {
            return res.status(400).json({ error: 'Participant ID Missing' });
        }   

            const userExists = await participant.findById(id);
            if (!userExists) return res.status(400).json({message: 'Participant does not exist.'});

        // Delete participant from the database

        await participant.findByIdAndDelete(id);

        res.status(200).json({ message: 'Participant deleted!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }       
};



