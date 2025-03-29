const express = require('express');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.post('/', conversationController.createConversation);
router.get('/', conversationController.getAllConversations);
router.get('/:id', conversationController.getConversationsByCandidate);
router.delete('/:id', conversationController.deleteConversation);

module.exports = router;
