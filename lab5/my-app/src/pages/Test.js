import React, { useState } from "react";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";

const correctAnswers = {
  q1: "1789",
  q2: "Колумб",
  q3: "1939",
  q4: "1969",
  q5: "1989",
  q6: "1066",
  q7: "Наполеон",
  q8: "1920",
  q9: "1492",
  q10: "1917",
  q11: "Галілей",
  q12: "1961",
  q13: "Берлін",
  q14: "Декларація незалежності",
  q15: "Чорнобиль"
};

const questions = [
  { key: "q1", text: "1. Коли відбулася Французька революція?", options: ["1776", "1789", "1812"] },
  { key: "q2", text: "2. Хто відкрив Америку?", options: ["Магеллан", "Колумб", "Кук"] },
  { key: "q3", text: "3. Коли почалася Друга світова війна?", options: ["1914", "1939", "1945"] },
  { key: "q4", text: "4. У якому році людина вперше ступила на Місяць?", options: ["1957", "1969", "1975"] },
  { key: "q5", text: "5. Коли впала Берлінська стіна?", options: ["1979", "1989", "1999"] },
  { key: "q6", text: "6. Битва при Гастінгсі відбулася в:", options: ["1066", "1215", "1415"] },
  { key: "q7", text: "7. Хто став імператором Франції у 1804 році?", options: ["Людовик XVI", "Наполеон", "Робесп'єр"] },
  { key: "q8", text: "8. У якому році засновано Лігу Націй?", options: ["1919", "1920", "1945"] },
  { key: "q9", text: "9. Коли Христофор Колумб уперше приплив до Америки?", options: ["1492", "1500", "1517"] },
  { key: "q10", text: "10. Революція в Росії, яка привела до влади більшовиків:", options: ["1905", "1917", "1922"] },
  { key: "q11", text: "11. Хто довів, що Земля обертається навколо Сонця?", options: ["Галілей", "Арістотель", "Птолемей"] },
  { key: "q12", text: "12. Перший політ людини в космос:", options: ["1959", "1961", "1965"] },
  { key: "q13", text: "13. Яке місто було розділене Стіною під час Холодної війни?", options: ["Варшава", "Прага", "Берлін"] },
  { key: "q14", text: "14. Який документ підписано в США у 1776 році?", options: ["Конституція", "Декларація незалежності", "Білль про права"] },
  { key: "q15", text: "15. У якому місті сталася ядерна катастрофа у 1986 році?", options: ["Фукусіма", "Чорнобиль", "Севастополь"] },
];

const Test = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("");
  const [averageScore, setAverageScore] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let score = 0;
    const total = questions.length;

    for (let key in correctAnswers) {
      if (answers[key] === correctAnswers[key]) {
        score++;
      }
    }

    const message =
      score === total
        ? `Відмінно! Ви відповіли правильно на всі ${total} питань.`
        : `Ви відповіли правильно на ${score} з ${total} питань.`;

    setResult(message);
    setResultColor(score === total ? "green" : "red");

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "testResults"), {
          uid: user.uid,
          email: user.email,
          score,
          total,
          timestamp: serverTimestamp(),
        });

        // Завантажити всі попередні результати
        const q = query(
          collection(db, "testResults"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        let totalScore = 0;
        let count = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.score !== undefined) {
            totalScore += data.score;
            count++;
          }
        });

        if (count > 0) {
          const avg = (totalScore / count).toFixed(2);
          setAverageScore(avg);
        }
      } else {
        console.warn("Користувач не увійшов. Результат не збережено.");
      }
    } catch (error) {
      console.error("Помилка збереження/отримання результатів:", error);
    }
  };

  return (
    <main className="test-page">
      <h2>Перевірте свої знання з історії</h2>
      <p>Виберіть правильні відповіді та натисніть "Перевірити".</p>

      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div className="question" key={q.key}>
            <p>{q.text}</p>
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={q.key}
                  value={option}
                  checked={answers[q.key] === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Перевірити</button>
      </form>

      <p style={{ color: resultColor, textAlign: "center", fontSize: "1.2rem", fontWeight: "bold", marginTop: "20px" }}>
  {result}
</p>

{averageScore !== null && (
  <p style={{
    color: "#00ffff", // яскраво-бірюзовий
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold"
  }}>
    Ваш середній бал: {averageScore} з {questions.length}
  </p>
)}
    </main>
  );
};

export default Test;
