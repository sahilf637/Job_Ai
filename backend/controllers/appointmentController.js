const Appointment = require('../models/appointment');

exports.createAppointment = async (req, res) => {
    try {
        const { job_id, candidate_id, date_time, status } = req.body;
        if (!job_id || !candidate_id || !date_time || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const appointmentId = await Appointment.create(job_id, candidate_id, date_time, status);
        res.status(201).json({ message: 'Appointment scheduled successfully', appointmentId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.getAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.getById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { job_id, candidate_id, date_time, status } = req.body;
        const affectedRows = await Appointment.update(req.params.id, job_id, candidate_id, date_time, status);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const affectedRows = await Appointment.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
