const db = require('../config/database');

class Job {
    static async create(title, description, requirements) {
        const [result] = await db.execute(
            'INSERT INTO jobs (title, description, requirements) VALUES (?, ?, ?)',
            [title, description, requirements]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM jobs ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM jobs WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, title, description, requirements) {
        const [result] = await db.execute(
            'UPDATE jobs SET title = ?, description = ?, requirements = ? WHERE id = ?',
            [title, description, requirements, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM jobs WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Job;
