import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Assure-toi que le chemin est correct


export default function Dashboard() {
    const listings = [
        {
            id: 1,
            title: "Chambre cosy au centre-ville",
            location: "Paris, France",
            price: 45,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 2,
            title: "Appartement lumineux",
            location: "Lyon, France",
            price: 60,
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            title: "Colocation étudiante",
            location: "Marseille, France",
            price: 35,
            image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
        },
    ];
    return (
        <div className="dashboard">
            <section className="listings">
                {listings.map(listing => (
                    <div key={listing.id} className="card">
                        <img src={listing.image} alt={listing.title} className="card__image" />
                        <div className="card__content">
                            <h3 className="card__title">{listing.title}</h3>
                            <p className="card__location">{listing.location}</p>
                            <p className="card__price">{listing.price}€ / nuit</p>
                            <Link to={`/owner/detail/${listing.id}`} className="card__button">Voir les détails</Link>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
