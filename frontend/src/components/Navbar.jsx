import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-amber-100 h-18 flex items-center justify-between' style={{padding: 10}}>
        <h1>LOGO</h1>
        <ul className='flex justify-between gap-2'>
            <button>SignUp</button>
            <button>Login</button>
        </ul>
    </div>
  )
}

export default Navbar