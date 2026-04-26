import React from 'react'
import { PatientProvider } from './context/PatientContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/Layout'
import './index.css'

function App() {
   return (
      <LanguageProvider>
         <PatientProvider>
            <Layout />
         </PatientProvider>
      </LanguageProvider>
   )
}

export default App