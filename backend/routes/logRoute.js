const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { protect } = require('../middleware/authMiddleware.js');

// middleware (protect) runs before controller.
// The middleware attaches the authenticated participant to req.user.
// Later when submitting, /submit-log knows which participant (req.user._id) is submitting the log.
router.post("/submit-log", protect, logController.submitLog);

module.exports = router;

