import react from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends react.Component {
    render() {
        return (
            <header>

                <NavLink to="/"><img class="logo" src="./images/logo.png" alt="Історична Платформа" /></NavLink>
                
                <div class="header-content">
                    <h1>Історична Платформа</h1>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/chronology">Хронологія</NavLink></li>
                        <li><NavLink to="/events">Події</NavLink></li>
                        <li><NavLink to="/test">Тестування</NavLink></li>
                        <li><NavLink to="/auth">Вхід</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;