const getConnection = require('../getConnection');

const insertLikeQuery = async (idPost, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [userVotes] = await connection.query(
            `SELECT vote FROM userVotes WHERE idUser = ? AND idPost = ?`,
            [idUser, idPost]
        );

        if (userVotes.length === 0) {
            await connection.query(
                `INSERT INTO userVotes (idUser, idPost) VALUES (?, ?)`,
                [idUser, idPost]
            );
            return true;
        } else {
            await connection.query(
                `UPDATE userVotes SET vote = ? WHERE idUser = ? AND idPost = ?`,
                [!userVotes[0].vote, idUser, idPost]
            );
            return !userVotes[0].vote;
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLikeQuery;
