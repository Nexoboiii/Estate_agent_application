import { useState } from 'react'
import './App.css'
import Header from './Componenets/Header.jsx'
import Footer from './Componenets/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-wrapper">
      <Header />
      <main className="content-area">
        {/* This is where the Search Page or Property Detail Page will render */}
        
      </main>
      <Footer />
    </div>
  )
}

export default App
