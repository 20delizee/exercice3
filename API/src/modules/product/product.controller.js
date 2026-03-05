import * as service from "./product.service.js";
import { querySchema } from "./product.schema.js";
import logger from "../../core/utils/logger.js";

export const getAll = async (req, res) => {
    const query = querySchema.parse(req.query);
    logger.info(`getAll — params: ${JSON.stringify(query)}`);
    const products = await service.getAllProducts(query);
    res.status(200).json({ status: "success", count: products.length, data: products });
};

export const getById = async (req, res) => {
    logger.info(`getById — id: ${req.params.id}`);
    const product = await service.getProductById(req.params.id);
    res.status(200).json({ status: "success", data: product });
};
export const getByName = async (req, res) => {
    logger.info(`getByName — nom: ${req.params.nom}`);
    const product = await service.getProductByName(req.params.nom);
    res.status(200).json({ status: "success", data: product });
};
export const getByPrice = async (req, res) => {
    logger.info(`getByPrice — prix: ${req.params.prix}`);
    const product = await service.getProductByPrice(req.params.prix);
    res.status(200).json({ status: "success", data: product });
};
export const getByCategorie = async (req, res) => {
    logger.info(`getByCategorie — categorie: ${req.params.categorie}`);
    const product = await service.getProductByCategorie(req.params.categorie);
    res.status(200).json({ status: "success", data: product });
};

export const create = async (req, res) => {
    logger.info(`create — body: ${JSON.stringify(req.body)}`);
    const product = await service.createProduct(req.body);
    res.status(201).json({ status: "success", data: product });
};

export const update = async (req, res) => {
    logger.info(`update — id: ${req.params.id}`);
    const product = await service.updateProduct(req.params.id, req.body);
    res.status(200).json({ status: "success", data: product });
};

export const patchProduct = async (req, res) => {
    logger.info(`patch — id: ${req.params.id}`);
    const product = await service.patchProduct(req.params.id, req.body);
    res.status(200).json({ status: "success", data: product });
};

export const remove = async (req, res) => {
    logger.info(`delete — id: ${req.params.id}`);
    await service.deleteProduct(req.params.id);
    res.status(204).send();
};
