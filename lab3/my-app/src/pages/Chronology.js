import React, { useState } from "react";

const timelineData = [
    {
        year: "1492",
        title: "Відкриття Америки",
        description: "Христофор Колумб відкрив Новий Світ.",
        details: "12 жовтня 1492 року Христофор Колумб та його екіпаж досягли берегів Нового Світу..."
    },
    {
        year: "1789",
        title: "Французька революція",
        description: "Початок великої революції у Франції.",
        details: "Французька революція розпочалася 14 липня 1789 року зі штурму Бастилії..."
    },
    {
        year: "1969",
        title: "Політ на Місяць",
        description: "Перша висадка людини на Місяць - Ніл Армстронг.",
        details: "20 липня 1969 року астронавти місії Apollo 11 Ніл Армстронг і Базз Олдрін..."
    },
    {
        year: "1989",
        title: "Падіння Берлінської стіни",
        description: "Символічне завершення Холодної війни і возз'єднання Німеччини.",
        details: "9 листопада 1989 року тисячі людей зібралися біля Берлінської стіни..."
    },
    {
        year: "1991",
        title: "Розпад СРСР",
        description: "Кінець Радянського Союзу і утворення незалежної України...",
        details: "Розпад СРСР відбувся у грудні 1991 року після підписання Біловезької угоди..."
    },
    {
        year: "2004",
        title: "Вступ України до СОТ",
        description: "Україна приєдналася до Світової організації торгівлі.",
        details: "Україна стала членом СОТ 16 травня 2008 року після тривалого процесу переговорів..."
    }
];

const Chronology = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <main>
            <section className="timeline">
                {timelineData.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-date">{item.year}</div>
                        <div className="timeline-content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <button className="more-info" onClick={() => openModal(item)}>
                                Дізнатися більше
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {selectedItem && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>{selectedItem.title}</h2>
                        <p>{selectedItem.details}</p>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Chronology;
