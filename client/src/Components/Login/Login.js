import React, { useState } from 'react';
import './Login.css';
import { useToken } from '../../TokenContext';
import { Link, Navigate } from 'react-router-dom';
import { FiUserCheck } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Login = () => {
  const [token, setToken] = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (token) return <Navigate to='/posts' />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await response.json();

      if (body.status === 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Vaya...😕',
          text: 'Email o contraseña incorrecto!',
        });
      } else {
        setToken(body.data.token);
      }
    } catch (err) {
      console.log(err);
      setLoading('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='body-login'>
      <div className='login-box'>
        <img src='biglogo.png' alt='biglogo' />
        <h2>
          <FiUserCheck />
        </h2>
        <section>
          <form onSubmit={handleSubmit}>
            <div className='user-box'>
              <input
                id='email'
                type='text'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className='user-box'>
              <input
                id='password'
                type='password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <input disabled={loading} type='submit' value='Log In' />
          </form>
          <hr />
          <p className='toSignup'>
            <span>Aún no tienes cuenta?</span>
            <Link className='linksTwo' to='/signup'>
              <span className='toSignupButton'>Registrate</span>
            </Link>
          </p>
          {error && <p className='Error'>{error}</p>}
        </section>
      </div>
    </div>
  );
};

export default Login;
