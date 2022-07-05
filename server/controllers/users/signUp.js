const signUptUserQuery = require('../../db/userQueries/userQueriesSignUp');
const { generateError } = require('../../helpers');

const signUp = async (req, res, next) => {
    try {
        const { email, username, password, } = req.body;

        if (!email || !username || !password) {
            throw generateError('Faltan campos', 400);
        }

        const idUser = await signUptUserQuery(email, username, password);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = signUp;
