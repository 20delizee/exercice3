
import * as repo from "./product.repository.js";
import { NotFoundError } from "../../core/errors/AppError.js";


export const getAllProducts = async (query) => {
    return repo.findAll(query);
};


export const getProductById = async (id) => {
    const product = await repo.findById(id);
    if (!product) throw new NotFoundError(`Produit '${id}' introuvable`);
    return product;
};
export const getProductByName = async (nom) => {
    const product = await repo.findByName(nom);
    if (!product) throw new NotFoundError(`Produit '${nom}' introuvable`);
    return product;
};
export const getProductByPrice = async (prix) => {
    const product = await repo.findByPrice(prix);
    if (!product) throw new NotFoundError(`Produit '${prix}' introuvable`);
    return product;
};
export const getProductByCategorie = async (categorie) => {
    const product = await repo.findByCategorie(categorie);
    if (!product) throw new NotFoundError(`Produit '${categorie}' introuvable`);
    return product;
};

export const createProduct = async (data) => {
    return repo.create(data);
};


export const updateProduct = async (id, data) => {
    await getProductById(id);
    return repo.update(id, data);
};


export const patchProduct = async (id, data) => {
    await getProductById(id);
    return repo.patch(id, data);
};


export const deleteProduct = async (id) => {
    await getProductById(id);
    return repo.remove(id);
};
