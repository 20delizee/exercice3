import { Router } from "express";
import * as controller from "./rating.controller.js";
import validate from "../../core/middlewares/validate.js";
import { createRatingSchema, updateRatingSchema, queryRatingSchema } from "./rating.schema.js";
const router = Router();

router.get("/", validate(queryRatingSchema), controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(createRatingSchema), controller.create);
router.put("/:id", validate(updateRatingSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
