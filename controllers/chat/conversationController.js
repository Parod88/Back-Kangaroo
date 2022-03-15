'use strict';

const Conversation = require('../../models/chat/Conversation.js');

//Create a new conversation
const createConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.userSenderId, req.body.userReceiverId]
    });
    const saveConversation = await newConversation.save();
    res.status(200).json({results: saveConversation});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

//Get conversation of a user
const getAllUserConversations = async (req, res, next) => {
  try {
    const userConversations = await Conversation.find({members: {$in: [req.params.userId]}});
    res.status(200).json({results: userConversations});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

module.exports = {
  createConversation,
  getAllUserConversations
};
