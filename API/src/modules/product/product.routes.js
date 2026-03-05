import { Router } from "express";
import * as controller from "./product.controller.js";
import validate from "../../core/middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";

const router = Router();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/products/name/:nom:
 *   get:
 *     summary: Récupérer un produit par son nom
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.get("/name/:nom", controller.getByName);


/**
 * @swagger
 * /api/products/price/:prix:
 *   get:
 *     summary: Récupérer un produit par son prix
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.get("/price/:prix", controller.getByPrice);


/**
 * @swagger
 * /api/products/categorie/:categorie:
 *   get:
 *     summary: Récupérer un produit par sa catégorie
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.get("/categorie/:categorie", controller.getByCategorie);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 */
router.post("/", validate(createProductSchema), controller.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mettre à jour un produit existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.put("/:id", validate(createProductSchema), controller.update);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *     summary: Mettre à jour partiellement un produit existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.patch("/:id", validate(updateProductSchema), controller.patchProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprimer un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.delete("/:id", controller.remove);

export default router;
