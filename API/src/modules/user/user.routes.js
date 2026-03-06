import { Router } from "express";
import * as controller from "./user.controller.js";
import validate from "../../core/middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";
const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer tous les utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               mot_de_passe:
 *                 type: string
 *                 example: motdepasse123
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer un utilisateur par son ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               mot_de_passe:
 *                 type: string
 *                 example: motdepasse123
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer un utilisateur par son email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               mot_de_passe:
 *                 type: string
 *                 example: motdepasse123
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/email/:email", controller.getByEmail);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               mot_de_passe:
 *                 type: string
 *                 example: motdepasse123
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post("/", validate(createUserSchema), controller.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Mettre à jour un utilisateur existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/:id", validate(updateUserSchema), controller.update);

/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *     tags:
 *       - Users
 *     summary: Mettre à jour partiellement un utilisateur existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               mot_de_passe:
 *                 type: string
 *                 example: motdepasse123
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:id", controller.remove);

export default router;
