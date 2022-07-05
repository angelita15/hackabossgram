const selectUserById = require('../../db/userQueries/selectUserByIdQuery');

const getUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;

        const user = await selectUserById(idUser);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUser;
