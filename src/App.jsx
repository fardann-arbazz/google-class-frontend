import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './layouts/Home'
import Content from './pages/Content'
import Kelas from './pages/Kelas'
import Orang from './pages/Orang'
import { KelasLayouts } from './layouts/KelasLayouts'
import Tugas from './pages/Tugas'
import Pertanyaan from './pages/Pertanyaan'
import JawabanSuccess from './components/JawabanSuccess'
import Nilai from './pages/Nilai'
import Users from './components/Users'
import Ujian from './pages/Ujian'
import JawabUjian from './components/JawabUjian'
import LihatUjian from './pages/LihatUjian'

function App() {
  return (
    <Router>
     <Routes>
       <Route path='/' element={<Login />} />
       <Route path='/home' element={<Home />} >
         <Route index element={<Content />} />
         <Route path='class/:id' element={<KelasLayouts />} >
           <Route index element={<Kelas />} />
           <Route path='orang' element={<Orang />} />
           <Route path='tugas' element={<Tugas />} />
           <Route path='pertanyaan/:id' element={<Pertanyaan />} />
         </Route>
         <Route path='nilai' element={<Nilai />} />
         <Route path='users' element={<Users />} />
         <Route path='ujian' element={<Ujian />} />
         <Route path='ujian/pantau' element={<LihatUjian />} />
       </Route>
         <Route path='/end' element={<JawabanSuccess />} />
         <Route path='ujian/:id' element={<JawabUjian />} />
     </Routes>
    </Router>
  )
}

export default App
