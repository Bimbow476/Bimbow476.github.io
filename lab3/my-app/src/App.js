import React from "react";

import Home from "./pages/Home";
import Chronology from "./pages/Chronology";
import Events from "./pages/Events";
import Test from "./pages/Test";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exec path="/" Component={Home} />
          <Route path="/chronology" Component={Chronology} />
          <Route path="/events" Component={Events} />
          <Route path="/test" Component={Test} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
