import * as ratingService from './rating.service.js';
import { queryRatingSchema } from './rating.schema.js'; 
import logger from '../../core/utils/logger.js';
export const getAll = async (req, res) => {
    const query = queryRatingSchema.parse(req.query);
    logger.info(`getAll — params: ${JSON.stringify(query)}`);
    const ratings = await ratingService.getAllRatings(query);
    res.status(200).json({ status: "success", count: ratings.length, data: ratings });
};

export const getById = async (req, res) => {
    logger.info(`getById — id: ${req.params.id}`);
    const rating = await ratingService.getRatingById(req.params.id);
    res.status(200).json({ status: "success", data: rating });
};

export const create = async (req, res) => {
    logger.info(`create — body: ${JSON.stringify(req.body)}`);
    const rating = await ratingService.createRating(req.body);
    res.status(201).json({ status: "success", data: rating });
};

export const update = async (req, res) => {
    logger.info(`update — id: ${req.params.id}`);
    const rating = await ratingService.updateRating(req.params.id, req.body);
    res.status(200).json({ status: "success", data: rating });
};

export const remove = async (req, res) => {
    logger.info(`delete — id: ${req.params.id}`);
    await ratingService.deleteRating(req.params.id);
    res.status(204).send();
};

