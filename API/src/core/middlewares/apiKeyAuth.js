import { verifyApiKey } from "../utils/apiKey.js";
import * as apikeyRepository from "../../modules/apikey/apikey.repository.js";

const apiKeyAuth = async (req, res, next) => {
    try {
        const apiKey = req.headers["x-api-key"] || req.headers["authorization"]?.split(" ")[1];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                message: "Accès non autorisé: clef d'API manquante"
            });
        }

        const { hashApiKey } = await import("../utils/apiKey.js");
        const incomingHash = hashApiKey(apiKey);

        const keyRecord = await apikeyRepository.findByHash(incomingHash);

        if (!keyRecord) {
            return res.status(403).json({
                status: "error",
                message: "Accès refusé: clef d'API invalide"
            });
        }

        apikeyRepository.updateLastUsed(keyRecord.id).catch(console.error);

        next();
    } catch (error) {
        console.error("Erreur d'authentification:", error);
        return res.status(500).json({
            status: "error",
            message: "Erreur interne du serveur lors de l'authentification"
        });
    }
};

export default apiKeyAuth;
