'use strict';

const express = require('express');
const router = express.Router();

const {
  createConversation,
  getAllUserConversations
} = require('../../../../controllers/chat/conversationController.js');

// Routes
router.post('/', createConversation);
router.get('/:userId', getAllUserConversations);

module.exports = router;
