const selectAllPostsQuery = require('../../db/postQueries/selectAllPostsQuery');

const listPosts = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const { idUser } = req;

        const posts = await selectAllPostsQuery(idUser, keyword);

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listPosts;
