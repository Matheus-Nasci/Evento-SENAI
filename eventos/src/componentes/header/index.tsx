import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../assets/styles/global.css';

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div>
            <header>
                <nav>
                    <h3>{props.title}</h3>
                    <ul className="menu">
                        <li><Link className="link" to="/">Home</Link></li>
                        <li><Link className="link" to="/login">Login</Link></li>
                        <li><Link className="link" to="/eventos">Eventos</Link></li>

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;