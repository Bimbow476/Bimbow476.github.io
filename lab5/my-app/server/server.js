const express = require("express");
const cors = require("cors");
const path = require("path");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin SDK
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const JWT_SECRET = "secret123";

app.post("/api/register", async (req, res) => {
  const { email, password, firstName, lastName, age } = req.body;

  if (!email || !password || !firstName || !lastName || !age) {
    return res.status(400).json({ message: "Усі поля обов’язкові" });
  }

  try {
    const existing = await db.collection("users").where("email", "==", email).get();
    if (!existing.empty) {
      return res.status(400).json({ message: "Користувач вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = await db.collection("users").add({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      age,
    });

    res.status(201).json({ message: "Реєстрація успішна", userId: userRef.id });
  } catch (err) {
    console.error("Помилка реєстрації:", err);
    res.status(500).json({ message: "Помилка сервера при реєстрації" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return res.status(404).json({ message: "Користувача не знайдено" });

    const doc = snapshot.docs[0];
    const user = doc.data();

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Невірний пароль" });

    const token = jwt.sign({ uid: doc.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
      },
    });
  } catch (err) {
    console.error("Помилка входу:", err);
    res.status(500).json({ message: "Помилка сервера при вході" });
  }
});

app.get("/api/profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Неавторизовано" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const doc = await db.collection("users").doc(decoded.uid).get();

    if (!doc.exists) return res.status(404).json({ message: "Користувача не знайдено" });

    const { password, ...userData } = doc.data();
    res.json(userData);
  } catch (err) {
    console.error("Помилка профілю:", err);
    res.status(403).json({ message: "Недійсний токен" });
  }
});

app.post("/api/lessons", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Неавторизовано" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { language, title } = req.body;
    const date = new Date().toISOString().split("T")[0];

    if (!language || !title) {
      return res.status(400).json({ message: "Мова та назва уроку обов’язкові" });
    }

    await db.collection("lessonProgress").add({
      userId: decoded.uid,
      language,
      title,
      date,
    });

    res.status(201).json({ message: "Урок збережено" });
  } catch (err) {
    console.error("Помилка збереження уроку:", err);
    res.status(500).json({ message: "Помилка сервера при збереженні уроку" });
  }
});

app.get("/api/lessons", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Неавторизовано" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const date = req.query.date;

    let query = db.collection("lessonProgress").where("userId", "==", decoded.uid);
    if (date) query = query.where("date", "==", date);

    const snapshot = await query.get();
    const lessons = snapshot.docs.map(doc => doc.data());

    res.json(lessons);
  } catch (err) {
    console.error("Помилка отримання уроків:", err);
    res.status(500).json({ message: "Помилка сервера при отриманні уроків" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
