import pool from '../../config/db.js';

export const findAll = async () => {
    const [rows] = await pool.execute("SELECT * FROM orders");
    return rows;
};

export const findById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM orders WHERE id = ?", [id]);
    return rows[0] || null;
};

export const create = async ({ customer_name, products }) => {
    const [result] = await pool.execute(
        "INSERT INTO orders (customer_name, products) VALUES (?, ?)",
        [customer_name, products]
    );
    return findById(result.insertId);
};

export const update = async (id, { customer_name, products }) => {
    await pool.execute(
        "UPDATE orders SET customer_name = ?, products = ? WHERE id = ?",
        [customer_name, products, id]
    );
    return findById(id);
};

export const remove = async (id) => {
    await pool.execute("DELETE FROM orders WHERE id = ?", [id]);
};  