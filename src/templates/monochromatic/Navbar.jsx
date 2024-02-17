import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fixed top-0 right-0 bg-black rounded-bl-full h-16 px-6 pl-10 py-2 text-white font-semibold flex items-center justify-end'>
        <nav className='flex gap-4'>
            <a href='#about'>About Me</a>
            <a href='#work'>My Work</a>
            <a href='#contact'>Contact Me</a>
        </nav>
    </div>
  )
}

export default Navbar