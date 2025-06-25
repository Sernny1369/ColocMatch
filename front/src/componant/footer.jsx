import React from "react";

export default function Footer() {
    return (
        <footer style={{ background: "#f8f8f8", padding: "2rem 4rem", textAlign: "center", color: "#555" }}>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
                © {new Date().getFullYear()} ColocMatch by Stael hugo & Sergio.<br/> Tous droits réservés.
            </p>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem" }}>
                <a href="/terms" style={{ color: "#FF5A5F", textDecoration: "none" }}>Conditions d'utilisation</a> | 
                <a href="/privacy" style={{ color: "#FF5A5F", textDecoration: "none", marginLeft: "0.5rem" }}>Politique de confidentialité</a>
            </p>
            
        </footer>
    );
}
