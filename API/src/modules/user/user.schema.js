import z from "zod";
export const createUserSchema = z.object({
    nom: z
        .string({ required_error: "Le champ 'nom' est obligatoire" })
        .min(1, "Le nom ne peut pas être vide")
        .max(255, "Le nom ne doit pas dépasser 255 caractères"),
    email: z
        .string({ required_error: "Le champ 'email' est obligatoire" })
        .email("Le format de l'email est invalide")
        .max(255, "L'email ne doit pas dépasser 255 caractères"),
    password: z
        .string({ required_error: "Le champ 'password' est obligatoire" })
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(255, "Le mot de passe ne doit pas dépasser 255 caractères"),
});

export const updateUserSchema = createUserSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Au moins un champ doit être fourni pour la mise à jour",
    });

export const queryUserSchema = z.object({
    sort_by: z.enum(["nom", "email"]).optional(),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
});