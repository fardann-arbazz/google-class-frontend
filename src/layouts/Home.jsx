import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
          <Header />
          <div className='flex'>
            <Sidebar />
             <Outlet  />
          </div>
    </div>
  )
}

export default Home