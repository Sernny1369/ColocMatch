import React from "react";
import { useState } from "react";
import "../styles/signup.css"; 



export default function Signup() {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
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
=======
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
 
>>>>>>> 55a1c6c (Initial commit)
    return (
      <main className="main-content">
        <h1 className="title">Signup Page</h1>
        <p className="subtitle">Inscris-toi pour trouver ta future colocation !</p>

        <form className="signup-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
          <label>
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </label>

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
=======
          

          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
>>>>>>> 55a1c6c (Initial commit)
            onChange={handleChange}
          />

          <input
<<<<<<< HEAD
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

=======
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

>>>>>>> 55a1c6c (Initial commit)
          <button type="submit">Créer un compte</button>
        </form>
      </main>
    )
<<<<<<< HEAD
}
=======
};
>>>>>>> 55a1c6c (Initial commit)
