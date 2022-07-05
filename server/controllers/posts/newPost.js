const path = require('path');
const sharp = require('sharp');
const insertPostQuery = require('../../db/postQueries/insertPostQuery');
const { nanoid } = require('nanoid');
const { generateError, createPathIfNotExist } = require('../../helpers');

const newPost = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { image } = req.files;

        if (!text || text.length > 150) {
            throw generateError(
                'Text missing or length exceeds 150 characters',
                400
            );
        }

        if (!image) {
            throw generateError('Needs image', 400);
        }

        let imgName;

        if (req.files && req.files.image) {
            const imgFolder = path.join(__dirname, '..', '..', 'uploads');

            await createPathIfNotExist(imgFolder);

            const sharpImg = sharp(req.files.image.data);
            sharpImg.resize(500);

            imgName = `${nanoid(24)}.jpg`;

            const imgPath = path.join(imgFolder, imgName);

            await sharpImg.toFile(imgPath);
        }

        await insertPostQuery(req.idUser, text, imgName);

        res.send({
            status: 'Ok',
            message: 'Post created',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newPost;
