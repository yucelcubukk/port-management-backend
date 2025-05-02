const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 💡 BURAYA ekliyoruz: PostgreSQL bağlantısını içe aktar
const pool = require('./config/db');

// Ana endpoint
app.get('/', (req, res) => {
  res.send('Port Backend API çalışıyor');
});

// 💡 Test endpoint: Veritabanı bağlantısı doğru çalışıyor mu?
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

