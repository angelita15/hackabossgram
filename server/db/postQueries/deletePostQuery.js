const getConnection = require('../getConnection');

const deletePostQuery = async (idPost) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM posts WHERE id = ?`, [idPost]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deletePostQuery;
