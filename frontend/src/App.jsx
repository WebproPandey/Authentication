import React from 'react'
import {Routes , Route, Navigate}  from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import {ToastContainer}  from "react-toastify"

const App = () => {
  return (
    <div className=''>
       
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </div>
  )
}

export default App