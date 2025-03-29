const Conversation = require('../models/conversation');

exports.createConversation = async (req, res) => {
    try {
        const { candidate_id, transcript, entities_extracted } = req.body;
        if (!candidate_id || !transcript || !entities_extracted) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const conversationId = await Conversation.create(candidate_id, transcript, entities_extracted);
        res.status(201).json({ message: 'Conversation logged successfully', conversationId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.getAll();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getConversationsByCandidate = async (req, res) => {
    try {
        const conversations = await Conversation.getByCandidate(req.params.id);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteConversation = async (req, res) => {
    try {
        const affectedRows = await Conversation.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
