import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Componenets/Header.jsx'
import Footer from './Componenets/Footer.jsx'
import SearchBox from './Componenets/SearchBox.jsx'
import PropertyPage from './Componenets/PropertyPage.jsx'

function App() {

  return (
    // Wrap the app with HashRouter for client-side routing
    <HashRouter>
      <div className="app-wrapper">
        {/* Header component for navigation */}
        <Header />
        <main className="content-area">
          {/* Define routes for different pages */}
          <Routes>
            {/* Route for the search page (home) */}
            <Route path="/" element={<SearchBox />} />
            {/* Route for individual property details, with dynamic ID */}
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </main>
        {/* Footer component */}
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
