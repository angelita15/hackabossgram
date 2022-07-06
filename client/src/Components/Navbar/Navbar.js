import React from 'react';
import './Navbar.css';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

// Navbar para los post con id

const Navbar = () => {
  return (
    <main className='Second-nav'>
      <nav className='Nav-OnePost'>
        <img src={process.env.PUBLIC_URL + '/minilogo.png'} alt='minilogo' />
        <div className='icons-main'>
          <a href='/posts'>
            <BsFillArrowLeftSquareFill className='mini-icon' />
          </a>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
