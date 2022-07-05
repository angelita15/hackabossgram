const selectPostByIdQuery = require('../../db/postQueries/selectPostByIdQuery');
const deletePostQuery = require('../../db/postQueries/deletePostQuery');

const { generateError, deletePhoto } = require('../../helpers');

const deletePost = async (req, res, next) => {
    try {
        const { idUser } = req;
        const { idPost } = req.params;

        const post = await selectPostByIdQuery(idPost, idUser);

        if (idUser !== post.idUser) {
            throw generateError('No tienes suficientes permisos', 401);
        }

        if (post.image) {
            await deletePhoto(post.image);
        }

        await deletePostQuery(idPost);

        res.send({
            status: 'ok',
            message: 'post eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deletePost;
