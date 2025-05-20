import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div>
        <Navbar/>
        <section className='flex flex-col items-center'>
            <div>
            <h1>Hey satish!</h1>
            <p>Today's data</p>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Calories</h2>
                    <h2>100</h2>
                </div>
                <div>
                    <h2>Protien</h2>
                    <h2>90</h2>
                </div>
                <div>
                    <h2>Carbs</h2>
                    <h2>100</h2>
                </div>
            </div>
            <div>
                <form action="">
                    <label htmlFor="">Enter Calories</label>
                    <input type="text" />
                    <label htmlFor="">Enter Protien</label>
                    <input type="text" />
                    <label htmlFor="">Enter Carbs</label>
                    <input type="text" />
                </form>
            </div>
        </section>
    </div>
  )
}

export default Dashboard