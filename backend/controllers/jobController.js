const Job = require('../models/job');

exports.createJob = async (req, res) => {
    try {
        const { title, description, requirements } = req.body;
        if (!title || !description || !requirements) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const jobId = await Job.create(title, description, requirements);
        res.status(201).json({ message: 'Job created successfully', jobId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.getAll();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.getById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { title, description, requirements } = req.body;
        const affectedRows = await Job.update(req.params.id, title, description, requirements);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const affectedRows = await Job.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
