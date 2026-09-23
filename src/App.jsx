import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import PortfolioHome from "./components/PortfolioHome";

import PortfolioDashboard from "./components/PortfolioDashboard";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
   <>

     <BrowserRouter>
      <Routes>

        {/* Main Website */}
        <Route
          path="/"
          element={
            <>
              <PortfolioHome />
              {/* Tumhara portfolio content */}
            </>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PortfolioDashboard />
          }
        />

      </Routes>
    </BrowserRouter>

     
     
   </>
     
  )
}

export default App
