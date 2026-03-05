import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        logger.warn(`Validation échouée sur ${req.method} ${req.originalUrl}`);
        return res.status(422).json({
            status: "error",
            message: "Validation échouée",
            errors: err.issues.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }

    if (err instanceof AppError) {
        logger.warn(`[${err.name}] ${req.method} ${req.originalUrl} — ${err.message}`);
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    if (err.code && err.code.startsWith("ER_")) {
        logger.error(`Erreur base de données: ${err.code} — ${err.message}`);
        return res.status(500).json({
            status: "error",
            message: "Erreur base de données",
            code: err.code,
        });
    }

    logger.error(err);
    return res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Erreur serveur interne",
    });
};

export default errorHandler;
