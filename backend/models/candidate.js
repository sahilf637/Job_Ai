const db = require('../config/database');

class Candidate {
    static async create(name, phone, current_ctc, expected_ctc, notice_period, experience) {
        const [result] = await db.execute(
            'INSERT INTO candidates (name, phone, current_ctc, expected_ctc, notice_period, experience) VALUES (?, ?, ?, ?, ?, ?)',
            [name, phone, current_ctc, expected_ctc, notice_period, experience]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM candidates');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM candidates WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, name, phone, current_ctc, expected_ctc, notice_period, experience) {
        const [result] = await db.execute(
            'UPDATE candidates SET name = ?, phone = ?, current_ctc = ?, expected_ctc = ?, notice_period = ?, experience = ? WHERE id = ?',
            [name, phone, current_ctc, expected_ctc, notice_period, experience, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM candidates WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Candidate;
