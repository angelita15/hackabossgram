const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError('Need header authorization', 401);
        }

        let token;

        try {
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Incorrect Token', 401);
        }

        req.idUser = token.id;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
