// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Auth() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    } catch (error) {
      alert("Помилка реєстрації: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("Помилка входу: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="auth-page">
      <h1>Сторінка автентифікації</h1>

      {user ? (
        <div className="auth-success">
          <h2>Вітаємо, {user.email}</h2>
          <p>Ви успішно увійшли в систему.</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <div className="auth-container">
          <div className="register-form">
            <h2>Реєстрація</h2>
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Зареєструватися</button>
          </div>

          <div className="login-form">
            <h2>Вхід</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Увійти</button>
          </div>
        </div>
      )}
    </div>
  );

}

export default Auth;
