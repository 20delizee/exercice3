import * as repo from "./user.repository.js";
import { NotFoundError } from "../../core/errors/AppError.js";

export const getAllUsers = async (query) => {
    return repo.findAll(query);
};

export const getUserById = async (id) => {
    const user = await repo.findById(id);
    if (!user) throw new NotFoundError(`Utilisateur '${id}' introuvable`);
    return user;
};
export const getUserByEmail = async (email) => {
    const user = await repo.findByEmail(email);
    if (!user) throw new NotFoundError(`Utilisateur '${email}' introuvable`);
    return user;
};

export const createUser = async (data) => {
    return repo.create(data);
};

export const updateUser = async (id, data) => {
    await getUserById(id);
    return repo.update(id, data);
};

export const deleteUser = async (id) => {
    await getUserById(id);
    return repo.remove(id);
};