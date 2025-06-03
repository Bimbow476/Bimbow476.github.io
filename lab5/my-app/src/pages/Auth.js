import React, { useState, useEffect } from "react";

function Auth() {
  const [form, setForm] = useState({
    register: { email: "", password: "", firstName: "", lastName: "", age: "" },
    login: { email: "", password: "" },
  });
  const [user, setUser] = useState(null);

  const API_URL = "http://localhost:3001/api";

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.register),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Реєстрація успішна. Тепер увійдіть.");
    } catch (err) {
      alert("Помилка реєстрації: " + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.login),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      alert("Помилка входу: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setUser(data);
      else localStorage.removeItem("token");
    } catch (err) {
      console.error("Помилка профілю:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="auth-page">
      <h1>Сторінка автентифікації</h1>

      {user ? (
        <div className="auth-success">
          <h2>Вітаємо, {user.firstName} {user.lastName}</h2>
          <p>Email: {user.email}</p>
          <p>Вік: {user.age}</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <div className="auth-container">
          <div className="register-form">
            <h2>Реєстрація</h2>
            <input
              type="text"
              placeholder="Ім'я"
              value={form.register.firstName}
              onChange={(e) => handleChange("register", "firstName", e.target.value)}
            />
            <input
              type="text"
              placeholder="Прізвище"
              value={form.register.lastName}
              onChange={(e) => handleChange("register", "lastName", e.target.value)}
            />
            <input
              type="number"
              placeholder="Вік"
              value={form.register.age}
              onChange={(e) => handleChange("register", "age", e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.register.email}
              onChange={(e) => handleChange("register", "email", e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={form.register.password}
              onChange={(e) => handleChange("register", "password", e.target.value)}
            />
            <button onClick={handleRegister}>Зареєструватися</button>
          </div>

          <div className="login-form">
            <h2>Вхід</h2>
            <input
              type="email"
              placeholder="Email"
              value={form.login.email}
              onChange={(e) => handleChange("login", "email", e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={form.login.password}
              onChange={(e) => handleChange("login", "password", e.target.value)}
            />
            <button onClick={handleLogin}>Увійти</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
