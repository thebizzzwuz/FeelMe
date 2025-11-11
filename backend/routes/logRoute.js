const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
//const { protect } = require('../middleware/authMiddleware.js');

// middleware (protect) runs before controller.
// The middleware attaches the authenticated participant to req.user.
// Later when submitting, /submit-log knows which participant (req.user._id) is submitting the log.

//router.post("/submit-log", protect, logController.submitLog);
router.post("/submit-log", logController.submitLog);

// Get logs by participant
// router.get("/", protect, logController.getLogsByParticipant);
router.get("/:participantId", logController.getLogsByParticipant)
module.exports = router;

// Download logs for a specific participant (user)
//router.get('/download', protect, logController.downloadParticipantLogs);
router.get('/download/:participantId', logController.downloadParticipantLogs);