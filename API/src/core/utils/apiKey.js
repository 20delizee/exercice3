import crypto from "crypto";

export const generateApiKey = (length = 32) => {
    return crypto.randomBytes(length).toString("hex");
};

export const generatePrefixedApiKey = (prefix = "sk") => {
    const key = crypto.randomBytes(32).toString("hex");
    return `${prefix}_${key}`;
};

export const hashApiKey = (apiKey) => {
    return crypto
        .createHash("sha256")
        .update(apiKey)
        .digest("hex");
};

export const verifyApiKey = (apiKey, storedHash) => {
    const hash = hashApiKey(apiKey);
    return hash === storedHash;
};

export const createApiKeyPair = (prefix = "sk") => {
    const apiKey = generatePrefixedApiKey(prefix);
    const hash = hashApiKey(apiKey);

    return {
        apiKey, 
        hash,   
    };
};
