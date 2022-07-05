const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const signUptUserQuery = async (email, username, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ? OR username = ?`,
            [email, username]
        );

        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email o username en la base de datos',
                409
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            `INSERT INTO users (email, username, password) VALUES(?, ?, ?)`,
            [email, username, hashedPassword]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = signUptUserQuery;
