import React, { useState, useEffect } from "react";
import "./likes.css"; // ← à créer juste après

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // Données simulées
    setLikes([
      { id: 1, title: "Coloc Marseille", status: "en attente" },
      { id: 2, title: "T2 Nantes", status: "matché" },
    ]);
  }, []);

  return (
    <div className="likes-wrapper">
      <h1 className="likes-title">💖 Mes Likes</h1>
      {likes.length === 0 ? (
        <p className="likes-empty">Aucun like pour le moment.</p>
      ) : (
        <div className="likes-list">
          {likes.map((like) => (
            <div key={like.id} className={`like-card ${like.status === "matché" ? "matched" : ""}`}>
              <h2 className="like-title">{like.title}</h2>
              <p className="like-status">
                Statut : <span>{like.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikesPage;
