import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterGuru from './components/RegisterGuru'
import RegisterSiswa from './components/RegisterSiswa'
import Login from './components/Login'
import Home from './layouts/Home'
import Content from './pages/Content'
import Kelas from './pages/Kelas'

function App() {
  return (
    <Router>
     <Routes>
       <Route path='/' element={<RegisterGuru />} />
       <Route path='/siswa' element={<RegisterSiswa />} />
       <Route path='/login' element={<Login />} />
       <Route path='/home' element={<Home />} >
         <Route index element={<Content />} />
         <Route path='class/:id' element={<Kelas />} />
       </Route>
     </Routes>
    </Router>
  )
}

export default App
