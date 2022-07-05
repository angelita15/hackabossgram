const getConnection = require('../getConnection');

const insertPostQuery = async (idUser, text, image) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
              INSERT INTO posts (idUser, text, image)
              VALUES (?, ?, ?)
            `,
            [idUser, text, image]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPostQuery;
