const Candidate = require('../models/candidate');

exports.createCandidate = async (req, res) => {
    try {
        const { name, phone, current_ctc, expected_ctc, notice_period, experience } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: 'Name and phone are required' });
        }

        const candidateId = await Candidate.create(name, phone, current_ctc, expected_ctc, notice_period, experience);
        res.status(201).json({ message: 'Candidate added successfully', candidateId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.getAll();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.getById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateCandidate = async (req, res) => {
    try {
        const { name, phone, current_ctc, expected_ctc, notice_period, experience } = req.body;
        const affectedRows = await Candidate.update(req.params.id, name, phone, current_ctc, expected_ctc, notice_period, experience);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const affectedRows = await Candidate.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
