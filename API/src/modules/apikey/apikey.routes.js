import express from "express";
import { createApiKeyPair } from "../../core/utils/apiKey.js";
import * as apikeyRepository from "./apikey.repository.js";

const router = express.Router();

/**
 * @swagger
 * /api/keys:
 *   post:
 *     tags:
 *       - API Keys
 *     summary: Créer une une nouvelle clé d'API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Quentin
 *     responses:
 *       201:
 *         description: Clé d'API créée avec succès
 */
router.post("/", async (req, res, next) => {
    try {
        const { apiKey, hash } = createApiKeyPair();
        const name = req.body.name || "Default Key";

        await apikeyRepository.create(name, hash);

        res.status(201).json({
            status: "success",
            message: "Clef d'API générée avec succès. Conservez-la précieusement, elle ne sera plus affichée.",
            data: {
                name,
                apiKey
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
