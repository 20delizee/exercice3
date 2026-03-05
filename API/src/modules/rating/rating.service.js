import * as repo from "./rating.repository.js";
import { NotFoundError } from "../../core/errors/AppError.js";  

export const getAllRatings = async (query) => {
    return repo.findAll(query);
};

export const getRatingById = async (id) => {
    const rating = await repo.findById(id);
    if (!rating) throw new NotFoundError(`Rating '${id}' introuvable`);
    return rating;
};

export const createRating = async (data) => {
    return repo.create(data);
};  

export const updateRating = async (id, data) => {
    await getRatingById(id);
    return repo.update(id, data);
};

export const deleteRating = async (id) => {
    await getRatingById(id);
    return repo.remove(id);
};

