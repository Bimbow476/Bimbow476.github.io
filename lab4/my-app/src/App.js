// src/App.js
import React from "react";

import Home from "./pages/Home";
import Chronology from "./pages/Chronology";
import Events from "./pages/Events";
import Test from "./pages/Test";
import Auth from "./pages/Auth";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chronology" element={<Chronology />} />
            <Route path="/events" element={<Events />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/test"
              element={
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
