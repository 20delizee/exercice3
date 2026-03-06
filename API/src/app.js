import "./config/env.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import logger from "./core/utils/logger.js";
import rateLimiter from "./core/middlewares/rateLimiter.js";
import cacheControl from "./core/middlewares/cacheControl.js";
import errorHandler from "./core/middlewares/errorHandler.js";
import productRouter from "./modules/product/product.routes.js";
import setupSwagger from "./swagger/swagger.js";
import userRouter from "./modules/user/user.routes.js";
import ratingRouter from "./modules/rating/rating.routes.js";
import orderRouter from "./modules/orders/order.routes.js";
import apikeyRouter from "./modules/apikey/apikey.routes.js";
import apiKeyAuth from "./core/middlewares/apiKeyAuth.js";
import openApiDocument from "./openapi.json" with { type: "json" };

const app = express();

app.use(express.json());

app.use("/apid", swaggerUi.serve, swaggerUi.setup(openApiDocument));

setupSwagger(app);

app.use(rateLimiter);

app.use(cacheControl);

app.use((req, _res, next) => {
    logger.http(`${req.method} ${req.originalUrl}`);
    next();
});


app.use("/api/keys", apikeyRouter);

app.use(apiKeyAuth);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/orders", orderRouter);

app.use((_req, res) => {
    res.status(404).json({ status: "error", message: "Route introuvable" });
});

app.use(errorHandler);

export default app;
