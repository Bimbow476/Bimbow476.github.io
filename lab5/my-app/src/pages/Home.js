import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div>
                    <main>
        <section class="hero">
            <h2>Ласкаво просимо!</h2>
            <p>Вивчайте історію через інтерактивні події, хронологічні шкали та цікаві тести.</p>
            <a href="/chronology" class="btn">Почати вивчення</a>
        </section>

        <section class="features">
            <div class="feature">
                <h3>📜 Хронологія</h3>
                <p>Огляд історичних подій у зручному форматі часової шкали.</p>
                <a href="/chronology">Детальніше</a>
            </div>
            <div class="feature">
                <h3>🌍 Події</h3>
                <p>Інтерактивний огляд історичних подій із зображеннями та картами.</p>
                <a href="/events">Детальніше</a>
            </div>
            <div class="feature">
                <h3>📝 Тестування</h3>
                <p>Перевірте свої знання за допомогою цікавих тестів.</p>
                <a href="/test">Пройти тест</a>
            </div>
        </section>
    </main>

            </div>
        );
    }
}

export default Home;