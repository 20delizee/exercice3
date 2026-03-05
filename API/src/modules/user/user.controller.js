import * as service from "./user.service.js";
import { queryUserSchema } from "./user.schema.js";
import logger from "../../core/utils/logger.js";

export const getAll = async (req, res) => {
    const query = queryUserSchema.parse(req.query);
    logger.info(`getAll — params: ${JSON.stringify(query)}`);
    const users = await service.getAllUsers();
    res.status(200).json({ status: "success", count: users.length, data: users });
};

export const getById = async (req, res) => {
    logger.info(`getById — id: ${req.params.id}`);
    const user = await service.getUserById(req.params.id);
    res.status(200).json({ status: "success", data: user });
};
export const getByEmail = async (req, res) => {
    logger.info(`getByEmail — email: ${req.params.email}`);
    const user = await service.getUserByEmail(req.params.email);
    res.status(200).json({ status: "success", data: user });
};

export const create = async (req, res) => {
    logger.info(`create — body: ${JSON.stringify(req.body)}`);
    
    const { nom, email, password } = req.body;
    
    // Validation basique
    if (!nom || !email || !password) {
        return res.status(400).json({ 
            status: "error", 
            message: "Champs requis : nom, email, password" 
        });
    }
    
    try {
        const user = await service.createUser({ nom, email, password });
        res.status(201).json({ status: "success", data: user });
    } catch (error) {
        logger.error(`create — error: ${error.message}`);
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const update = async (req, res) => {
    logger.info(`update — id: ${req.params.id}`);
    const user = await service.updateUser(req.params.id, req.body);
    res.status(200).json({ status: "success", data: user });
};

export const remove = async (req, res) => {
    logger.info(`delete — id: ${req.params.id}`);
    await service.deleteUser(req.params.id);
    res.status(200).json({ status: "success", message: "User deleted successfully" });
};


