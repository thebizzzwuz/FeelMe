const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Route to delete a participant
router.delete('/delete', participantController.deleteParticipant);

module.exports = router;
