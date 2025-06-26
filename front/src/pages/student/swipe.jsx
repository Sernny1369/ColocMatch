import React from "react";
import "./swipe.css"; 
import { useState } from "react";

const annonces = [
  {
    id: 1,
    photo: "/images/annonce1.jpg",
    nom: "Léo",
    age: 22,
    lieu: "Lyon",
    bio: "Cherche coloc sympa pour partager un grand appart avec balcon !",
    contact: "leo@mail.com"
  },
  {
    id: 2,
    photo: "/images/annonce2.jpg",
    nom: "Mira",
    age: 24,
    lieu: "Paris",
    bio: "Je suis étudiante en droit. Je cherche une colocation calme.",
    contact: "mira@mail.com"
  }
  // Tu peux ajouter d'autres annonces
];

function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([]);

  const currentAnnonce = annonces[currentIndex];

  const handleSwipeLeft = () => {
    if (currentIndex < annonces.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    setLikes([...likes, currentAnnonce]);
    if (currentIndex < annonces.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
      <main className="swipe-main-content">
        {currentAnnonce ? (
          <div className="card">
            <img src={currentAnnonce.photo} alt="profil" className="card-img" />
            <div className="card-info">
              <h2>{currentAnnonce.nom}, {currentAnnonce.age}</h2>
              <p className="lieu">{currentAnnonce.lieu}</p>
              <p className="bio">{currentAnnonce.bio}</p>
              <p className="contact">📩 {currentAnnonce.contact}</p>
            </div>
            <div className="buttons">
              <button className="left" onClick={handleSwipeLeft}>⛔ Passer</button>
              <button className="right" onClick={handleSwipeRight}>❤️ Like</button>
            </div>
          </div>
        ) : (
          <div className="end-message">Plus d’annonces disponibles !</div>
        )}
      </main> 
  );
};

export default SwipePage;
