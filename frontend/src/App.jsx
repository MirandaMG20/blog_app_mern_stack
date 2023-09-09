import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react"
import "./index.css";
import Header from "./components/header/Header"

function App() {

  return (
    <>
      <Router>

        <Header />

      </Router>
    </>
  )
}


export default App
