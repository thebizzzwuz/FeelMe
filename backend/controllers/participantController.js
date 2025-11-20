const participant = require('../models/participant')

exports.deleteParticipant = async (req, res) => {
    try {
        const { participantId } = req.body;

        // Validation checks
        if (!participantId) {
            return res.status(400).json({ error: 'Participant ID Missing' });
        }   

        try {
            const userExists = await participant.findOne({participantId});
            if (!userExists) return res.status(400).json({message: 'Participant does not exist.'});
        }
        catch (err) {
            res.status(500).json({ message: 'Error checking participant existence' });
        }
        // Delete participant from the database
        await participant.deleteOne({ participantId });

        res.status(200).json({ message: 'Participant deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }       
};



