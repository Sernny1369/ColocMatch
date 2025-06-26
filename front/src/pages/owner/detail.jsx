// src/pages/owner/FlatDetails.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import listings from "./listings";

const FlatDetails = () => {
  const { id } = useParams();
  const [profiles, setProfiles] = useState([]);
  
  const listing = listings.find(l => l.id === Number(id));

  useEffect(() => {
    // Fake profils pour test
    setProfiles([
      { id: 1, name: "Alice", age: 22 },
      { id: 2, name: "Lucas", age: 24 },
    ]);
  }, [id]);

  const handleAction = (profileId, action) => {
    console.log(`Logement ${id} - ${action} du profil ${profileId}`);
    // Ici tu envoies l'info au backend (match/refus)
  };

  return (
    <>
      <section className="bg-gray-100 p-6">
        <img src={listing.image} alt={listing.title} className="card__image" />
        <div className="card__content">
          <h3 className="card__title">{listing.title}</h3>
          <p className="card__location">{listing.location}</p>
          <p className="card__price">{listing.price}€ / nuit</p>
        </div>
      </section>
      <section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Profils intéressés</h1>
          {profiles.map(profile => (
            <div key={profile.id} className="border p-4 rounded mb-3 flex justify-between">
              <div>
                <p><strong>{profile.name}</strong>, {profile.age} ans</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleAction(profile.id, 'match')} className="bg-green-500 px-3 py-1 rounded text-white">Match</button>
                <button onClick={() => handleAction(profile.id, 'refuse')} className="bg-red-500 px-3 py-1 rounded text-white">Refuser</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FlatDetails;
