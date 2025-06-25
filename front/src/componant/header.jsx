import React from "react";

export default function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 4rem", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h1 style={{ color: "#FF5A5F", fontWeight: 700, fontSize: "2rem" }}>ColocMatch</h1>
            <nav>
                <a href="#" style={{ margin: "0 1rem", color: "#222", textDecoration: "none" }}>Accueil</a>
                <a href="#" style={{ margin: "0 1rem", color: "#222", textDecoration: "none" }}>Mes annonces</a>
                <a href="#" style={{ margin: "0 1rem", color: "#222", textDecoration: "none" }}>Profil</a>
            </nav>
            <label for="theme" className="theme">
                <span className="theme__toggle-wrap">
                    <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" value="dark" />
                        <span className="theme__fill"></span>
                        <span className="theme__icon">
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                        </span>
                </span>
            </label>
        </header>
    )
}