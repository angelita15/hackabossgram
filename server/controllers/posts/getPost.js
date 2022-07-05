const selectPostByIdQuery = require('../../db/postQueries/selectPostByIdQuery');

const getPost = async (req, res, next) => {
    try {
        const { idPost } = req.params;
        const {idUser} = req

        const post = await selectPostByIdQuery(idPost, idUser);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPost;
