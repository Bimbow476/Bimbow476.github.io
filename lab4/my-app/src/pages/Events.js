import React from "react";

class Events extends React.Component {
    render() {
        return (
            <main>
                <h2>Детальні історичні події</h2>

                <div class="event">
                    <img src="images/america.jpg" alt="Відкриття Америки" />
                    <h3>1492 – Відкриття Америки</h3>
                    <p>12 жовтня 1492 року Христофор Колумб відкрив Америку, що стало початком європейської колонізації Нового Світу.</p>
                </div>

                <div class="event">
                    <img src="/images/FranchRevolution.jpg" alt="Французька революція" />
                    <h3>1789 – Французька революція</h3>
                    <p>Подія, яка змінила хід історії. Почалася боротьба за рівність, свободу та братерство, що призвело до падіння монархії.</p>
                </div>

                <div class="event">
                    <img src="images/FirstWorldWar.jpg" alt="Перша світова війна" />
                    <h3>1914-1918 – Перша світова війна</h3>
                    <p>Глобальний конфлікт, що охопив багато країн світу, призвів до великих змін у геополітиці та створення нових держав.</p>
                </div>
            </main>
        );
    }
}

export default Events;