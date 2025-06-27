const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const supabase = require('../DatabaseConnection');

const BUCKET_HOST = 'announcement-creator-user';
const BUCKET_STUDENT = 'normal-user-bucket';

router.get('/host/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { data, error } = await supabase
    .from('AnnouncementCreatorUser')
    .select('*')
    .eq('uuid', uuid)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


router.put('/host/:uuid', upload.single('photo'), async (req, res) => {
  const { uuid } = req.params;
  const updates = req.body;
 
  if (!req.file && 'photo' in updates) delete updates.photo;
  Object.keys(updates).forEach(key => {
    if (updates[key] === '') updates[key] = null;
    if (['age', 'budget'].includes(key) && updates[key] !== null && updates[key] !== undefined) {
      const n = parseInt(updates[key], 10);
      updates[key] = isNaN(n) ? null : n;
    }
  });

  if (req.file) {
    try {
      const filePath = `${uuid}/${Date.now()}_${req.file.originalname}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_HOST)
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });
      if (uploadError) throw uploadError;
      const publicUrl = supabase.storage.from(BUCKET_HOST).getPublicUrl(uploadData.path).data.publicUrl;
      updates.photo = publicUrl;
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  const { data, error } = await supabase
    .from('AnnouncementCreatorUser')
    .update(updates)
    .eq('uuid', uuid)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


router.get('/student/:uuid', async (req, res) => {
  const { uuid } = req.params;
  const { data, error } = await supabase
    .from('NormalUser')
    .select('*')
    .eq('uuid', uuid)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.put('/student/:uuid', upload.single('photo'), async (req, res) => {
  const { uuid } = req.params;
  const updates = req.body;
  // If no file uploaded, remove potential JSON 'photo' field sent by front
  if (!req.file && 'photo' in updates) delete updates.photo;
  Object.keys(updates).forEach(key => {
    if (updates[key] === '') updates[key] = null;
    if (['age', 'budget'].includes(key) && updates[key] !== null && updates[key] !== undefined) {
      const n = parseInt(updates[key], 10);
      updates[key] = isNaN(n) ? null : n;
    }
  });

  if (req.file) {
    try {
      const filePath = `${uuid}/${Date.now()}_${req.file.originalname}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_STUDENT)
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });
      if (uploadError) throw uploadError;
      const publicUrl = supabase.storage.from(BUCKET_STUDENT).getPublicUrl(uploadData.path).data.publicUrl;
      updates.photo = publicUrl;
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  const { data, error } = await supabase
    .from('NormalUser')
    .update(updates)
    .eq('uuid', uuid)
    .select()
    .single();
    if (error) {
      console.error('Supabase update error:', error);   
      return res.status(500).json({ error: error.message });
    }
});

module.exports = router;