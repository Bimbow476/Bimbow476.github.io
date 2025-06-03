import React, { useState } from "react";

const eventsData = [
    {
        id: "america",
        title: "1492 – Відкриття Америки",
        image: "/images/america.jpg",
        description:
            "12 жовтня 1492 року Христофор Колумб відкрив Америку, що стало початком європейської колонізації Нового Світу.",
        quiz: [
            {
                q: "Хто відкрив Америку у 1492 році?",
                options: ["Кук", "Колумб", "Магеллан"],
                answer: "Колумб"
            },
            {
                q: "Яка країна фінансувала експедицію Колумба?",
                options: ["Португалія", "Франція", "Іспанія"],
                answer: "Іспанія"
            },
            {
                q: "Який континент був метою Колумба?",
                options: ["Азія", "Африка", "Південна Америка"],
                answer: "Азія"
            }
        ]
    },
    {
        id: "revolution",
        title: "1789 – Французька революція",
        image: "/images/FranchRevolution.jpg",
        description:
            "Подія, яка змінила хід історії. Почалася боротьба за рівність, свободу та братерство, що призвело до падіння монархії.",
        quiz: [
            {
                q: "У якому році почалась Французька революція?",
                options: ["1776", "1789", "1804"],
                answer: "1789"
            },
            {
                q: "Що було головним гаслом революції?",
                options: ["Порядок і стабільність", "Свобода, рівність, братерство", "Слава і нація"],
                answer: "Свобода, рівність, братерство"
            },
            {
                q: "Кого стратили під час революції?",
                options: ["Людовик XVI", "Наполеона", "Робесп'єра"],
                answer: "Людовик XVI"
            }
        ]
    },
    {
        id: "ww1",
        title: "1914-1918 – Перша світова війна",
        image: "/images/FirstWorldWar.jpg",
        description:
            "Глобальний конфлікт, що охопив багато країн світу, призвів до великих змін у геополітиці та створення нових держав.",
        quiz: [
            {
                q: "Коли почалася Перша світова війна?",
                options: ["1912", "1914", "1916"],
                answer: "1914"
            },
            {
                q: "Який союз включав Францію, Великобританію та Росію?",
                options: ["Троїстий союз", "Антанта", "Осьові сили"],
                answer: "Антанта"
            },
            {
                q: "Що стало причиною початку війни?",
                options: ["Атака на Перл-Харбор", "Вбивство ерцгерцога Франца Фердинанда", "Революція в Німеччині"],
                answer: "Вбивство ерцгерцога Франца Фердинанда"
            }
        ]
    },
    {
        id: "moon",
        title: "1969 – Перша людина на Місяці",
        image: "/images/FirstHumanMoon.jpg",
        description:
            "У 1969 році Ніл Армстронг став першою людиною, яка ступила на поверхню Місяця. Це стало визначною подією в космічних перегонах.",
        quiz: [
            {
                q: "Хто був першою людиною на Місяці?",
                options: ["Юрій Гагарін", "Базз Олдрін", "Ніл Армстронг"],
                answer: "Ніл Армстронг"
            },
            {
                q: "Яка місія доставила людей на Місяць?",
                options: ["Аполлон-11", "Союз-1", "Восток-1"],
                answer: "Аполлон-11"
            }
        ]
    },
    {
        id: "ussr",
        title: "1991 – Розпад СРСР",
        image: "/images/ussr.jpg",
        description:
            "У 1991 році Радянський Союз офіційно припинив своє існування, що призвело до утворення незалежних країн на його території.",
        quiz: [
            {
                q: "У якому році розпався СРСР?",
                options: ["1989", "1990", "1991"],
                answer: "1991"
            },
            {
                q: "Скільки республік утворили СНД після розпаду СРСР?",
                options: ["10", "12", "15"],
                answer: "12"
            }
        ]
    },
    {
        id: "berlin",
        title: "1989 – Падіння Берлінської стіни",
        image: "/images/berlinwallfall.jpg",
        description:
            "Падіння Берлінської стіни стало символом завершення Холодної війни та возз'єднання Німеччини.",
        quiz: [
            {
                q: "У якому році впала Берлінська стіна?",
                options: ["1989", "1991", "1985"],
                answer: "1989"
            },
            {
                q: "Що символізувало падіння стіни?",
                options: ["Кінець Другої світової", "Кінець Холодної війни", "Початок Євросоюзу"],
                answer: "Кінець Холодної війни"
            }
        ]
    }
];

function Events() {
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState({});

    const handleChange = (eventId, questionIndex, value) => {
        setAnswers((prev) => ({
            ...prev,
            [eventId]: {
                ...prev[eventId],
                [questionIndex]: value
            }
        }));
    };

    const handleSubmit = (eventId) => {
        setSubmitted((prev) => ({
            ...prev,
            [eventId]: true
        }));
    };

    return (
        <main>
            <h2>Детальні історичні події</h2>

            {eventsData.map((event) => (
                <div className="event" key={event.id}>
                    <img src={event.image} alt={event.title} />
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>

                    <button onClick={() => setActiveQuiz(event.id)}>
                        Пройти мінітест
                    </button>

                    {activeQuiz === event.id && (
                        <div className="mini-quiz">
                            <h4>Мінітест до події</h4>
                            {event.quiz.map((q, index) => {
                                const userAnswer = answers[event.id]?.[index];
                                const isCorrect = userAnswer === q.answer;
                                return (
                                    <div key={index} className="quiz-question">
                                        <p>{q.q}</p>
                                        <div className="options-row">
                                            {q.options.map((opt) => (
                                                <label key={opt} className="option-inline">
                                                    <input
                                                        type="radio"
                                                        name={`${event.id}-${index}`}
                                                        value={opt}
                                                        checked={userAnswer === opt}
                                                        onChange={(e) =>
                                                            handleChange(event.id, index, e.target.value)
                                                        }
                                                        disabled={submitted[event.id]}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                        {submitted[event.id] && (
                                            isCorrect ? (
                                                <p style={{ color: "green" }}>✅ Правильно</p>
                                            ) : (
                                                <p style={{ color: "red" }}>
                                                    ❌ Неправильно. Правильна відповідь: <strong>{q.answer}</strong>
                                                </p>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                            {!submitted[event.id] && (
                                <button onClick={() => handleSubmit(event.id)}>Перевірити</button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </main>
    );
}

export default Events;
