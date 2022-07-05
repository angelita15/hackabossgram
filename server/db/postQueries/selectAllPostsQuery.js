const getConnection = require('../getConnection');

const selectAllPostsQuery = async (idUser, keyword) => {
    let connection;

    try {
        connection = await getConnection();

        let posts;

        if (keyword) {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, O.username, P.image, P.text, SUM(IFNULL(U.vote = 1, 0)) AS likes, P.idUser = ? AS owner, BIT_OR(U.idUser = ? AND U.vote = 1) AS likedByMe, P.createdAt
                    FROM posts P
                    LEFT JOIN users O
                    ON P.idUser = O.id
                    LEFT JOIN userVotes U
                    ON P.id = U.idPost
                    WHERE P.text LIKE ?
                    GROUP BY P.id
                    ORDER BY P.createdAt DESC
                `,
                [idUser, idUser, `%${keyword}%`]
            );
        } else {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, O.username, P.image, P.text, SUM(IFNULL(U.vote = 1, 0)) AS likes, P.idUser = ? AS owner, BIT_OR(U.idUser = ? AND U.vote = 1) AS likedByMe, P.createdAt
                    FROM posts P
                    LEFT JOIN users O
                    ON P.idUser = O.id
                    LEFT JOIN userVotes U
                    ON P.id = U.idPost
                    GROUP BY P.id
                    ORDER BY P.createdAt DESC
                `,
                [idUser, idUser]
            );
        }

        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPostsQuery;
