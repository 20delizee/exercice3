import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    // Base de données
    DB_HOST: z.string().min(1, "DB_HOST est requis"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().min(1, "DB_USER est requis"),
    DB_PASSWORD: z.string().default(""),
    DB_NAME: z.string().min(1, "DB_NAME est requis"),

    // Serveur
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),

    // Rate limiting
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(3_600_000), // 1 heure
    RATE_LIMIT_MAX: z.coerce.number().default(100),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("❌ Variables d'environnement invalides :");
    console.error(result.error.format());
    process.exit(1);
}

export const env = result.data;
