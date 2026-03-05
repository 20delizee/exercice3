import { z } from "zod";

export const createRatingSchema = z.object({
    note: z
        .number({ required_error: "Le champ 'rating' est obligatoire" })
        .min(1, "La note doit être un nombre entre 1 et 5")
        .max(5, "La note doit être un nombre entre 1 et 5"),
    products: z
        .string({ required_error: "Le champ 'products' est obligatoire" })
        .min(1, "Le products ne peut pas être vide")
        .max(255, "Le products ne doit pas dépasser 255 caractères"),
    
});

export const updateRatingSchema = createRatingSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "Au moins un champ doit être fourni pour la mise à jour",
});

export const queryRatingSchema = z.object({
    sort_by: z.enum(["products", "note"]).optional(),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
});