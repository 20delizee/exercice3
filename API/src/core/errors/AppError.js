export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Ressource introuvable") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Requête invalide") {
        super(message, 400);
        this.name = "BadRequestError";
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflit de données") {
        super(message, 409);
        this.name = "ConflictError";
    }
}
