const db = require('../config/database');

class Appointment {
    static async create(job_id, candidate_id, date_time, status) {
        const [result] = await db.execute(
            'INSERT INTO appointments (job_id, candidate_id, date_time, status) VALUES (?, ?, ?, ?)',
            [job_id, candidate_id, date_time, status]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM appointments');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM appointments WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, job_id, candidate_id, date_time, status) {
        const [result] = await db.execute(
            'UPDATE appointments SET job_id = ?, candidate_id = ?, date_time = ?, status = ? WHERE id = ?',
            [job_id, candidate_id, date_time, status, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM appointments WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Appointment;
