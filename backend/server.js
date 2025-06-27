require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const supabase = require('./DatabaseConnection.js');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
   res.json({ info: "Express app with Supabase" })
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
