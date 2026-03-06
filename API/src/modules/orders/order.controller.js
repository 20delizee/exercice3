import * as orderService from "./order.service.js";
import { queryOrderSchema } from "./order.schema.js";
import logger from "../../core/utils/logger.js";

export const getAll = async (req, res) => {
    const query = queryOrderSchema.parse(req.query);
    logger.info(`getAll — params: ${JSON.stringify(query)}`);
    const orders = await orderService.getAllOrders(query);
    res.status(200).json({ status: "success", count: orders.length, data: orders });
};

export const getById = async (req, res) => {
    logger.info(`getById — id: ${req.params.id}`);
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json({ status: "success", data: req.params.id });
};

export const create = async (req, res) => {
    logger.info(`create — body: ${JSON.stringify(req.body)}`);
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ status: "success", data: req.body });
};

export const update = async (req, res) => {
    logger.info(`update — id: ${req.params.id}`);
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json({ status: "success", data: req.body });
};

export const remove = async (req, res) => {
    logger.info(`delete — id: ${req.params.id}`);
    await orderService.deleteOrder(req.params.id);
    res.status(204).send();
};