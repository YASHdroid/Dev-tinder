const adminAuth = (req, res, next) => {

    const token = "xyz";

    const isAdminAuthorized = token == "xyz";

    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized Access");
    }

    next();
};

const UserAuth = (req, res, next) => {

    const token = "xyz";

    const isAdminAuthorized = token == "xyz";

    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized Access");
    }

    next();
};

module.exports = {
    adminAuth,
    UserAuth
};