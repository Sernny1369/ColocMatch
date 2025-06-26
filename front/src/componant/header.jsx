import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Wlogo from "../assets/white_logo.png";


export default function Header() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark-theme", dark);
    }, [dark]);
    return (
        <header className="header">
            <img src={Wlogo} alt="logo" className="img" />
            <nav className="nav-links">
                <a href="dash">Accueil</a>
                <a href="#">Mes annonces</a>
                <a href="#">Profil</a>
                <a href="#">Se connecter</a>
                <a href="#">s'inscrire</a>
            </nav>
            <label htmlFor="theme" className="theme">
                <span className="theme__toggle-wrap">
                    <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" value="dark" checked={dark} onChange={() => setDark(!dark)} />
                    <span className="theme__fill"></span>
                    <span className="theme__icon">
                        {[...Array(9)].map((_, i) => (
                            <span key={i} className="theme__icon-part"></span>
                        ))}
                    </span>
                </span>
            </label>
        </header>
    )
}
