const cacheControl = (req, res, next) => {
    if (req.method === "GET") {
        res.set("Cache-Control", "public, max-age=600");
    } else {
        res.set("Cache-Control", "no-store");
    }
    next();
};

export default cacheControl;
