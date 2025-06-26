import React from "react";
import { useState } from "react";
import "../styles/signup.css"; 



export default function Signup() {
  const [formData, setFormData] = useState({
    photo: null,
    nom: "",
    prenom: "",
    age: "",
    sexe: "",
    lieu: "",
    bio: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // à remplacer par un appel API ou logique métier
  };
    return (
      <main className="main-content">
        <h1 className="title">Signup Page</h1>
        <p className="subtitle">Inscris-toi pour trouver ta future colocation !</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </label>

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
          />

          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Âge"
            value={formData.age}
            onChange={handleChange}
          />

          <select name="sexe" value={formData.sexe} onChange={handleChange}>
            <option value="">Sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>

          <input
            type="text"
            name="lieu"
            placeholder="Lieu de résidence"
            value={formData.lieu}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Quelques mots sur toi..."
            value={formData.bio}
            onChange={handleChange}
            rows="4"
          />

          <input
            type="text"
            name="contact"
            placeholder="Comment te contacter ? (email, tel, etc.)"
            value={formData.contact}
            onChange={handleChange}
          />

          <button type="submit">Créer un compte</button>
        </form>
      </main>
    )
}