import React from 'react'

const ScrollTopButton: React.FC = () => {
  
  const handleClick = (e: any) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button className="bottom-8 right-8 fixed cursor-pointer text-white bg-red-600 p-2 rounded-full" onClick={handleClick}>UP</button>
  )
}

export default ScrollTopButton;