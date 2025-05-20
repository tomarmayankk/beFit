import React from 'react'

const LoginPage = () => {
  return (
    <div className='bg-amber-300 w-full h-screen flex items-center justify-center'>
        <div className='bg-amber-200 w-96 h-96 rounded-md flex flex-col items-center justify-center gap-2'>
            <h1 className='text-3xl font-bold' >Login</h1>
            <form action="" className='flex flex-col items-center'>
                <div className='flex flex-col'>
                <label htmlFor="">Username</label>
                <input type="text" placeholder='johndoe' className='bg-amber-50 rounded-sm'/>
                </div>
                <div className='flex flex-col'>
                <label htmlFor="">Password</label>
                <input type="text" placeholder='*********' className='bg-amber-50 rounded-sm'/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage