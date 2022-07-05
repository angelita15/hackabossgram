require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const cors = require('cors');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

app.use(express.static('uploads'));

app.use(
    cors({
        origin: '*',
    })
);

/* ###### Middlewares Authorization ########*/

const authUser = require('./middlewares/authUser');
const postExist = require('./middlewares/postExist');
const authUserPost = require('./middlewares/authUserPosts');

/* ###### Endpoints USERS  ########*/

const { loginUser, signUp, getUser } = require('./controllers/users');

// New user registration //
app.post('/users', signUp);

// User Log in //
app.post('/login', loginUser);

// We get information from a user //
app.get('/users/:idUser', getUser);

/* ###### Endpoints POSTS  ########*/

const { newPost, getPost, listPosts } = require('./controllers/posts/');

// Create new post //
app.post('/posts', authUser, newPost);

// We get all the posts //
app.get('/posts', authUserPost, listPosts);

// We obtain a specific post with an ID //
app.get('/posts/:idPost', authUserPost, getPost);

/* ###### Endpoints Likes  ########*/

const newLike = require('./controllers/likes');

// Add or remove like //
app.post('/posts/:idPost/like', authUser, postExist, newLike);

/* ###### Endpoints Delete  ########*/

const deletePost = require('./controllers/posts/deletePost');

// Delete a post //
app.delete('/posts/:idPost', authUser, postExist, deletePost);

/* ###### Middlewares Error ########*/
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/* ###### Middlewares Not Found ########*/
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
