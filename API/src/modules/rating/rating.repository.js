import pool from '../../config/db.js';

export const findAll = async () => {
    const [rows] = await pool.execute("SELECT * FROM ratings");
    return rows;
};

export const findById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM ratings WHERE id = ?", [id]);
    return rows[0] || null;
};

export const create = async ({ products, note }) => {

    const [result] = await pool.execute(
        "INSERT INTO ratings (products, note) VALUES (?, ?)",
        [products, note]
    );
    return findById(result.insertId);
};
export const update = async (id, {products, note }) => {
    await pool.execute(
        "UPDATE ratings SET  products = ?, note = ? WHERE id = ?", 
        [products, note, id]
    );
    return findById(id);
};

export const remove = async (id) => {
    await pool.execute("DELETE FROM ratings WHERE id = ?", [id]);
};