import app from "./app.js";
import logger from "./core/utils/logger.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
    logger.info(`🚀 Serveur démarré sur http://localhost:${env.PORT}`);
});
