import React, { ReactNode } from 'react';
import Pokeball from '../assets/pokeball.svg';
import { Link } from 'react-router-dom';


interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <main className='min-h-screen mx-auto max-w-[800px] bg-red-600 p-2'>
      <div className='top-0 w-full max-w-[800px] flex items-center justify-between py-6 px-8 mx-auto '>
        <Link to={'/'} className='flex gap-2 mx-auto'>
          <img src={Pokeball} />
          <h1 className='text-xl text-white'>Pokedéx</h1>
        </Link>
      </div>
      {children}
    </main>
  )
}

export default DefaultLayout;