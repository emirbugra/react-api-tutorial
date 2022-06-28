// node_modules imports
import React from 'react'
import {
  HashRouter, Routes, Route,
} from 'react-router-dom'

// custom components
import {Home} from './page/home'
import {Login} from './page/login'
import {Register} from './page/register'
import axios from 'axios'

function App() {
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  return (<HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </HashRouter>)
}

export default App
