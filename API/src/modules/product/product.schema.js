import { z } from "zod";

export const createProductSchema = z.object({
    nom: z
        .string({ required_error: "Le champ 'nom' est obligatoire" })
        .min(1, "Le nom ne peut pas être vide")
        .max(255, "Le nom ne doit pas dépasser 255 caractères"),

    categorie: z
        .string({ required_error: "Le champ 'categorie' est obligatoire" })
        .min(1, "La catégorie ne peut pas être vide")
        .max(255, "La catégorie ne doit pas dépasser 255 caractères"),

    prix: z
        .number({
            required_error: "Le champ 'prix' est obligatoire",
            invalid_type_error: "Le prix doit être un nombre",
        })
        .positive("Le prix doit être un nombre positif")
        .multipleOf(0.01, "Le prix ne peut avoir que 2 décimales maximum"),
});

export const updateProductSchema = createProductSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Au moins un champ doit être fourni pour la mise à jour",
    });

export const querySchema = z.object({
    sort_by: z.enum(["nom", "categorie", "prix"]).optional(),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
    categorie: z.string().optional(),
});
