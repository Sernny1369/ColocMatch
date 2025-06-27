import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/header.css";
import Wlogo from "../assets/white_logo.png";



export default function Header() {
    const navigate = useNavigate();
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;
    const role = user?.customRole || user?.user_metadata?.role || user?.role;
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark-theme", dark);
    }, [dark]);
    return (
        <header className="header">
            <img src={Wlogo} alt="logo" className="img" />
            <nav className="nav-links"> 
                {role === "Host" && (
                    <>
                        <Link to="/host/dashboard">Accueil</Link>
                        <Link to="/host/profile">Profil</Link>
                        <Link to="/host/create">Créer annonce</Link>
                    </>
                )}
                {role === "Student" && (
                    <>
                        <Link to="/student/swipe">Annonces</Link>
                        <Link to="/student/profile">Profil</Link>
                        <Link to="/student/likes">Mes likes</Link>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login">Se connecter</Link>
                        <Link to="/signup">S'inscrire</Link>
                    </>
                )}
                {user && (
                    <button className="logout-btn" onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/login", { replace: true });
                    }}>Se déconnecter</button>
                )}
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
