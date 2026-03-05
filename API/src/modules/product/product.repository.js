import pool from "../../config/db.js";

const ALLOWED_SORT = ["nom", "categorie", "prix"];
const ALLOWED_ORDER = ["asc", "desc"];


export const findAll = async ({ sort_by, order = "asc", categorie } = {}) => {
    const sortColumn = ALLOWED_SORT.includes(sort_by) ? sort_by : null;
    const sortOrder = ALLOWED_ORDER.includes(order?.toLowerCase())
        ? order.toLowerCase()
        : "asc";

    let query = "SELECT * FROM products";
    const params = [];

    if (categorie) {
        query += " WHERE categorie = ?";
        params.push(categorie);
    }

    if (sortColumn) {
        query += ` ORDER BY ${sortColumn} ${sortOrder}`;
    }

    const [rows] = await pool.execute(query, params);
    return rows;
};


export const findById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0] || null;
};

export const findByName = async (nom) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE nom = ?", [nom]);
    return rows[0] || null;
};
export const findByPrice = async (prix) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE prix = ?", [prix]);
    return rows[0] || null;
};
export const findByCategorie = async (categorie) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE categorie = ?", [categorie]);
    return rows[0] || null;
};
export const create = async ({ nom, categorie, prix }) => {
    const [[{ newId }]] = await pool.execute("SELECT UUID() AS newId");
    await pool.execute(
        "INSERT INTO products (id, nom, categorie, prix) VALUES (?, ?, ?, ?)",
        [newId, nom, categorie, prix]
    );
    return findById(newId);
};


export const update = async (id, { nom, categorie, prix }) => {
    const [result] = await pool.execute(
        "UPDATE products SET nom = ?, categorie = ?, prix = ? WHERE id = ?",
        [nom, categorie, prix, id]
    );
    if (result.affectedRows === 0) return null;
    return findById(id);
};


export const patch = async (id, data) => {
    const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
    const values = [...Object.values(data), id];
    const [result] = await pool.execute(
        `UPDATE products SET ${fields} WHERE id = ?`,
        values
    );
    if (result.affectedRows === 0) return null;
    return findById(id);
};


export const remove = async (id) => {
    const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
