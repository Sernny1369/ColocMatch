import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/signup.css";

export default function HostProfile() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem('user');
  if (!userRaw) {
    navigate('/login', { replace: true });
    return null;
  }
  const user = JSON.parse(userRaw);
  const uuid = user.id || user.uuid;

  const [formData, setFormData] = useState({
    photo: null,
    last_name: '',
    first_name: '',
    biography: '',
    genre: '',
    location: '',
    budget: '',
    contact_number: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/profile/host/${uuid}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          first_name: data.first_name || data.prenom || '',
          last_name: data.last_name || data.nom || '',
          biography: data.biography || data.bio || '',
          genre: data.genre || data.sexe || '',
          location: data.location || data.lieu || '',
          budget: data.budget || '',
          contact_number: data.contact_number || data.contact || ''
        });
      })
      .catch(() => setMessage('Erreur de chargement du profil'));
  }, [uuid]);

  const handleChange = e => {
    if (e.target.name === 'photo') {
      setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
      return;
    }
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`/api/profile/host/${uuid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setMessage('Profil mis à jour');
      else {
        const data = await res.json();
        setMessage(data.error || 'Erreur de mise à jour');
      }
    } catch (err) {
      setMessage('Erreur serveur');
    }
  };

  return (
    <main className="profile-page">
      <h1>Mon profil (Hôte)</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </label>

          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={formData.last_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
          />

          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>

          <textarea
            name="biography"
            placeholder="Quelques mots sur toi..."
            value={formData.biography}
            onChange={handleChange}
            rows="4"
          />

          <input
            type="text"
            name="location"
            placeholder="Lieu"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget (€/mois)"
            value={formData.budget}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact_number"
            placeholder="Comment te contacter ? (email, tel, etc.)"
            value={formData.contact_number}
            onChange={handleChange}
          />
      
      {message && <p>{message}</p>}
      </form>
    </main>
  );
}
