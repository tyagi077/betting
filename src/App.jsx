import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
    <Sidebar/>
    <div className="lg:ml-[18rem] transition-all ease-in duration-300 py-4 px-8 min-h-screen capitalize">
      <Outlet />
    </div>
    </>
  )
}

export default App
