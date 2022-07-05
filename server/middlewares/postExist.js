const getConnection = require('../db/getConnection');
const { generateError } = require('../helpers');

const postExist = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const { idPost } = req.params;

        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE id = ?`,
            [idPost]
        );

        if (posts.length < 1) {
            throw generateError('Post no encontrado', 404);
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = postExist;
