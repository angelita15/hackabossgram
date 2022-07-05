const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectUserById = async (idUser) => {
    let Connection;

    try {
        Connection = await getConnection();

        const [users] = await Connection.query(
            `SELECT id, username, createdAt FROM users WHERE id = ?`,
            [idUser]
        );

        if (users.length < 1) {
            throw generateError('usuario no encontrado', 404);
        }
        return users[0];
    } finally {
        if (Connection) Connection.release();
    }
};

module.exports = selectUserById;
