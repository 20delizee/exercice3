import pool from "../../config/db.js";
import bcrypt from "bcrypt";
export const findAll = async () => {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows;
};

export const findById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
};

export const findByEmail = async (email) => {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

export const create = async ({ nom, email, password }) => {
    if (!nom || !email || !password) {
        throw new Error('Les champs nom, email et password sont requis');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.execute(
        "INSERT INTO users (nom, email, password) VALUES (?, ?, ?)", 
        [nom, email, hashedPassword]
    );
    
    return findByEmail(email);
};

export const update = async (id, { nom, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
        "UPDATE users SET nom = ?, email = ?, password = ? WHERE id = ?",
        [nom, email, hashedPassword, id]
    );
    return findById(id);
};

