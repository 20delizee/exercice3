import { Router } from "express";
import * as controller from "./rating.controller.js";
import validate from "../../core/middlewares/validate.js";
import { createRatingSchema, updateRatingSchema, queryRatingSchema } from "./rating.schema.js";
const router = Router();


/**
 * @swagger
 * /api/ratings:
 *   get:
 *     tags:
 *       - Ratings
 *     summary: Récupérer tous les commentaires
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 example: 2
 *               products:
 *                 type: string
 *                 example: javascript
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 */
router.get("/", validate(queryRatingSchema), controller.getAll);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     tags:
 *       - Ratings
 *     summary: Récupérer un commentaire par son ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 example: 2
 *               products:
 *                 type: string
 *                 example: javascript
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     tags:
 *       - Ratings
 *     summary: Créer un nouveau commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 example: 2
 *               products:
 *                 type: string
 *                 example: javascript
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 */
router.post("/", validate(createRatingSchema), controller.create);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     tags:
 *       - Ratings
 *     summary: Mettre à jour un commentaire existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 example: 2
 *               products:
 *                 type: string
 *                 example: javascript
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.put("/:id", validate(updateRatingSchema), controller.update);

/**
 * @swagger
 * /api/ratings/{id}:
 *  patch:
 *     tags:
 *       - Ratings
 *     summary: Mettre à jour partiellement un commentaire existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la commande à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 example: 2
 *               products:
 *                 type: string
 *                 example: javascript
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete("/:id", controller.remove);

export default router;
