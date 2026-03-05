import { z } from "zod";
//customer_name	varchar(255)
//products	varchar(255)
export const createOrderSchema = z.object({
    customer_name: z
        .string({ required_error: "Le champ 'customer_name' est obligatoire" })
        .min(1, "Le nom du client ne peut pas être vide")
        .max(255, "Le nom du client ne doit pas dépasser 255 caractères"),
    products: z
        .string({ required_error: "Le champ 'products' est obligatoire" })
        .min(1, "Les produits ne peuvent pas être vides")
        .max(255, "Les produits ne doivent pas dépasser 255 caractères"),
});

export const updateOrderSchema = createOrderSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "Au moins un champ doit être fourni pour la mise à jour",
});

export const queryOrderSchema = z.object({
    sort_by: z.enum(["customer_name", "products"]).optional(),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
});