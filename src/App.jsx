import React from 'react'
import { PatientProvider } from './context/PatientContext'
import Layout from './components/Layout'
import './index.css'

function App() {
   return (
      <PatientProvider>
         <Layout />
      </PatientProvider>
   )
}

export default App