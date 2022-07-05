import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { FiUserPlus } from 'react-icons/fi';
import './Signup.css';
import Swal from 'sweetalert2';

const Signup = () => {
  const [token] = useToken();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        Swal.fire({
          icon: 'warning',
          title: 'Ya existe un usuario con los mismos datos',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      } else {
        setMessage(body.message);
        Swal.fire({
          icon: 'success',
          title: 'Registrado con exito',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const successP = document.querySelector('p.Success');

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector('p.Success').remove();
      }, 5000);

      return () => clearTimeout(t);
    }
  });

  if (token) return <Navigate to='/' />;

  return (
    <div className='body-login'>
      <div className='login-box'>
        <img src='biglogo.png' alt='biglogo' />
        <h2>
          <FiUserPlus />
        </h2>
        <section>
          <form onSubmit={handleSubmit}>
            <div className='user-box'>
              <input
                id='username'
                type='text'
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>
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
            <input disabled={loading} type='submit' value='Sign In' />
          </form>
          <hr />
          <p className='toSignup'>
            <span>Ya tienes cuenta?</span>
            <Link className='linksTwo' to='/'>
              <span className='toSignupButton'>Iniciar Sesión</span>
            </Link>
          </p>
          {error && <p className='Error'>{error}</p>}
        </section>
      </div>
    </div>
  );
};

export default Signup;
