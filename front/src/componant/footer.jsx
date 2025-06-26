import React from "react";
import "../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">
                © {new Date().getFullYear()} ColocMatch by Stael Hugo & Sergio.<br /> Tous droits réservés.
            </p>
            <p className="footer__links">
                <a href="/terms">Conditions d'utilisation</a> | 
                <a href="/privacy">Politique de confidentialité</a>
            </p>
        </footer>
    );
}
