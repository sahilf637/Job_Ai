const db = require('../config/database');

class Conversation {
    static async create(candidate_id, transcript, entities_extracted) {
        const [result] = await db.execute(
            'INSERT INTO conversations (candidate_id, transcript, entities_extracted) VALUES (?, ?, ?)',
            [candidate_id, transcript, JSON.stringify(entities_extracted)]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM conversations');
        return rows;
    }

    static async getByCandidate(candidate_id) {
        const [rows] = await db.execute('SELECT * FROM conversations WHERE candidate_id = ?', [candidate_id]);
        return rows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM conversations WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Conversation;
