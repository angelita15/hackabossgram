import React from 'react';
import './NewPost.css';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const NewPost = () => {
  const [token] = useToken();

  const [text, setText] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('text', text);
      formData.append('image', selectedFile);

      const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        setError(body.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Si no estás registrado te redirige al login
  if (!token || success) return <Navigate to='/' />;

  return (
    <div className='NewPost-body'>
      <main className='NewPost'>
        <Navbar />
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder='¿Qué está pasando?'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className='upload-confirm'>
              <label className='custom-file-upload'>
                <input
                  type='file'
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
                <MdOutlineAddPhotoAlternate className='icon-upload' />
              </label>
              <button disabled={loading}>Enviar</button>
            </div>
          </form>
        </div>
        {error && <p className='Error'>{error}</p>}
      </main>
    </div>
  );
};

export default NewPost;
