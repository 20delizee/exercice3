import pool from "../../config/db.js";

export const create = async (name, key_hash) => {
    const [result] = await pool.execute(
        "INSERT INTO api_keys (name, key_hash) VALUES (?, ?)",
        [name, key_hash]
    );
    return result.insertId;
};

export const findByHash = async (key_hash) => {
    const [rows] = await pool.execute(
        "SELECT * FROM api_keys WHERE key_hash = ?",
        [key_hash]
    );
    return rows[0] || null;
};

export const findActiveKeys = async () => {
    const [rows] = await pool.execute("SELECT * FROM api_keys");
    return rows;
};

export const updateLastUsed = async (id) => {
    await pool.execute(
        "UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
    );
};
