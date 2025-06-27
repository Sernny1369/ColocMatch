const express = require('express');
const router = express.Router();
const supabase = require('../DatabaseConnection');

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

  console.log("Erreur Supabase Signup :", signUpError);

  if (signUpError) return res.status(400).json({ error: signUpError.message });

  if (!signUpData.user || !signUpData.user.id) {
    return res.status(500).json({ error: "No user id returned" });
  }

  const userId = signUpData.user.id;

  console.log("userId pour l'insert :", userId);

  let insertResult;

  if (role === 'Host') {
    insertResult = await supabase
      .from('AnnouncementCreatorUser')
      .insert([{ uuid: userId, email, role }]);
      
  } else if (role === 'Student') {
    insertResult = await supabase
      .from('NormalUser')
      .insert([{ uuid: userId, email, role }]);
  } else {
    return res.status(400).json({ error: 'Rôle invalide' });
  }

  if (insertResult.error) {
    console.error("Erreur d'insertion Supabase :", insertResult.error);
    return res.status(500).json({ error: `Erreur lors de la création du profil ${role}: ${insertResult.error.message}` });
  }

  return res.json({ message: `Compte ${role} créé avec succès`, user: signUpData.user });
});

router.post('/login', async (req, res) => {
  
  console.log("✅ Requête reçue avec body :", req.body);
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log("Erreur Supabase :", error);
      return res.status(401).json({ error: error.message });
    }

    const user = data.user;
    let customRole = null;

    let { data: host, error: hostError } = await supabase
      .from('AnnouncementCreatorUser')
      .select('role')
      .eq('uuid', user.id)
      .single();

    if (host && host.role) customRole = host.role;

    
    if (!customRole) {
      let { data: student, error: studentError } = await supabase
        .from('NormalUser')
        .select('role')
        .eq('uuid', user.id)
        .single();
      if (student && student.role) customRole = student.role;
    }

    
    const userWithRole = { ...user, customRole };

    res.json({ message: 'Login successful', session: data.session, user: userWithRole });
  } catch (err) {
    console.error("Erreur inconnue :", err);
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

module.exports = router;