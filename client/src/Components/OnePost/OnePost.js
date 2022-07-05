import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router';
import './OnePost.css';
import { FaUserAlt } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';

const OnePost = () => {
  const { idPost } = useParams();

  const post = useFetch(`http://localhost:4000/posts/${idPost}`);
  if (!post) {
    return <div className='onePost'>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='IdPost'>
        <div className='IdPost-content'>
          <h1>
            <FaUserAlt />
            {post.username}
          </h1>
          <div className='IdPost-subcontent'>
            <img src={`http://localhost:4000/${post.image}`} alt='postimage' />
            <div className='like-section'>
              <p>{post.likes} Me gusta</p>
            </div>
          </div>
          <footer>
            <p>{post.text}</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default OnePost;
