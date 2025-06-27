import React from "react";
import { useState } from "react";
import "../styles/signup.css"; 



export default function Signup() {
  const [formData, setFormData] = useState({
   email: "",
   password: "",
   role: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
     setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("Réponse du backend :", data);
      
      if (response.ok) {
        setMessage("Inscription réussie, vérifie tes emails !");
        setFormData({ email: "", password: "", role: "" });
      } else {
        setMessage(data.error || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };
 
    return (
      <main className="main-content">
        <h1 className="title">Signup Page</h1>
        <p className="subtitle">Inscris-toi pour trouver ta future colocation !</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          

          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Choississez votre rôle</option>
            <option value="Student">Étudiant</option>
            <option value="Host">Hote</option>
          </select>

          <button type="submit">Créer un compte</button>
        </form>
      </main>
    )
};
