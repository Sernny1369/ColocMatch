import React from "react";

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

export default function Dashboard() {
    return (
        <div style={{ fontFamily: "sans-serif", background: "#fafafa", minHeight: "100vh" }}>   
            <section style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", padding: "2rem 4rem" }}>
                {listings.map(listing => (
                    <div key={listing.id} style={{
                        background: "#fff",
                        borderRadius: 16,
                        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                        width: 320,
                        overflow: "hidden",
                        marginBottom: "2rem"
                    }}>
                        <img src={listing.image} alt={listing.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                        <div style={{ padding: "1rem" }}>
                            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>{listing.title}</h3>
                            <p style={{ color: "#888", margin: 0 }}>{listing.location}</p>
                            <p style={{ margin: "0.5rem 0 0 0", fontWeight: 600 }}>{listing.price}€ / nuit</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}