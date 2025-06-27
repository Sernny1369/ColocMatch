import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileCompletionModal.css';

const REQUIRED_FIELDS_STUDENT = [
  'last_name',
  'first_name',
  'age',
  'genre',
  'location',
  'biography',
  'budget',
  'contact_number'
];

const REQUIRED_FIELDS_HOST = [...REQUIRED_FIELDS_STUDENT];

export default function ProfileCompletionModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return;
    const user = JSON.parse(userRaw);
    const uuid = user.id || user.uuid;
    const role = user.customRole || user.user_metadata?.role || user.role;
    if (!role || !uuid) return;

    // Afficher la modale seulement sur les pages ciblées
    const pathOk = (role.toLowerCase() === 'host' && location.pathname.startsWith('/host/dashboard')) ||
                  (role.toLowerCase() === 'student' && location.pathname.startsWith('/student/swipe'));
    if (!pathOk) {
      setShow(false);
      return;
    }

    fetch(`/api/profile/${role.toLowerCase() === 'host' ? 'host' : 'student'}/${uuid}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        const required = role.toLowerCase() === 'host' ? REQUIRED_FIELDS_HOST : REQUIRED_FIELDS_STUDENT;
        const incomplete = required.some(field => !data[field]);
        setShow(incomplete);
      })
      .catch(() => {});
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="pcm-backdrop">
      <div className="pcm-modal">
        <h2>Complète ton profil !</h2>
        <p>Pour continuer, merci de renseigner les informations manquantes.</p>
        <button onClick={() => {
          const user = JSON.parse(localStorage.getItem('user'));
          const role = user.customRole || user.user_metadata?.role || user.role;
          navigate(role.toLowerCase() === 'host' ? '/host/profile' : '/student/profile');
        }}>Aller au profil</button>
      </div>
    </div>
  );
}
