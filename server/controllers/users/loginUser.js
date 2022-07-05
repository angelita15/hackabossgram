const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByUserNameQuery = require('../../db/userQueries/selectUserByUserNameQuery');
const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // We get the user by username  //
        const user = await selectUserByUserNameQuery(email);

        // Checking if password is correct //
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError('Contraseña incorrecta', 401);
        }

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
