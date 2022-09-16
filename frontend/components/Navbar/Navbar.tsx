import { useRouter } from 'next/router';
import React from 'react';

const Navbar = () => {
  const router = useRouter();
  return (
    <nav
      style={{
        width: '100%',
        height: '64px',
        backgroundImage: 'linear-gradient(to right, #3275c4, #1c2d50)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <button onClick={() => router.push('/')}>Home</button>
      <span style={{ display: 'flex', columnGap: 8 }}>
        <button onClick={() => router.push('/auth')}>Auth</button>
        <button onClick={() => router.push('/match')}>Match</button>
      </span>
    </nav>
  );
};

export default Navbar;
