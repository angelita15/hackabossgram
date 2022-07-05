const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectPostByIdQuery = async (idUser, idPost) => {
    let connection;

    try {
        connection = await getConnection();

        const [posts] = await connection.query(
            `
            SELECT P.id, P.idUser, O.username, P.image, P.text, SUM(IFNULL(U.vote = 1, 0)) AS likes, P.idUser = ? AS owner, BIT_OR(U.idUser = ? AND U.vote = 1) AS likedByMe, P.createdAt
            FROM posts P
            LEFT JOIN users O
            ON P.idUser = O.id
            LEFT JOIN userVotes U
            ON P.id = U.idPost
            WHERE P.id = ?
            GROUP BY P.id
            `,
            [idUser, idPost, idUser]
        );

        if (posts.length < 1) {
            throw generateError('Post not found', 404);
        }

        return posts[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPostByIdQuery;
