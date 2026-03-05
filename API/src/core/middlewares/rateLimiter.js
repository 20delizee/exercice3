import rateLimit from "express-rate-limit";
import { env } from "../../config/env.js";
import logger from "../utils/logger.js";

const rateLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn(`Rate limit dépassé pour l'IP ${req.ip}`);
        res.status(429).json({
            status: "error",
            message: `Trop de requêtes. Limite : ${env.RATE_LIMIT_MAX} par heure.`,
        });
    },
});

export default rateLimiter;
