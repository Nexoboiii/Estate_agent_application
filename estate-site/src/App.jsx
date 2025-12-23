import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Componenets/Header.jsx'
import Footer from './Componenets/Footer.jsx'
import SearchBox from './Componenets/SearchBox.jsx'
import PropertyPage from './Componenets/PropertyPage.jsx'

function App() {

  return (
    <div className="app-wrapper">
      <Header />
      <main className="content-area">
        {/* This is where the Search Page or Property Detail Page will render */}
        
        <Routes>
            <Route path="/" element={<SearchBox />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        
      </main>
      <Footer />
    </div>
  )
}

export default App
