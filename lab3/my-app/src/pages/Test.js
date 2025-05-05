import React, { useState } from "react";

const correctAnswers = {
    q1: "1789",
    q2: "Колумб",
    q3: "1939",
    q4: "1969",
    q5: "1989"
};

const Test = () => {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState("");

    const handleChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let score = 0;
        const total = Object.keys(correctAnswers).length;

        for (let key in correctAnswers) {
            if (answers[key] === correctAnswers[key]) {
                score++;
            }
        }

        if (score === total) {
            setResultColor("green");
            setResult(`Відмінно! Ви відповіли правильно на всі ${total} питання.`);
        } else {
            setResultColor("red");
            setResult(`Ви відповіли правильно на ${score} з ${total} питань. Спробуйте ще раз!`);
        }
    };

    const questions = [
        {
            key: "q1",
            text: "1. Коли відбулася Французька революція?",
            options: ["1776", "1789", "1812"]
        },
        {
            key: "q2",
            text: "2. Хто відкрив Америку?",
            options: ["Магеллан", "Колумб", "Кук"]
        },
        {
            key: "q3",
            text: "3. Коли почалася Друга світова війна?",
            options: ["1914", "1939", "1945"]
        },
        {
            key: "q4",
            text: "4. У якому році людина вперше ступила на Місяць?",
            options: ["1957", "1969", "1975"]
        },
        {
            key: "q5",
            text: "5. Коли впала Берлінська стіна?",
            options: ["1979", "1989", "1999"]
        }
    ];

    return (
        <main>
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

            <p style={{ color: resultColor }}>{result}</p>
        </main>
    );
};

export default Test;
