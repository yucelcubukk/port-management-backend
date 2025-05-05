console.log(">>> app.js YÜKLENDİ");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 💡 DEBUG: .env dosyasından PORT okunuyor mu?
console.log("PORT from .env:", process.env.PORT);

// 💡 GEÇİCİ TEST ROUTE – bu çalışıyorsa her şey yolunda demektir
//console.log(">>> /ports test route TANIMLANDI");
/*app.get('/ports', (req, res) => {
  console.log(">>> /ports endpoint çalıştı (istek alındı)");
  res.json({ message: 'Direct /ports test working!' });
});*/

// ✅ ASIL ROUTE'LARI BURAYA TAK
const portRoutes = require('./routes/portRoutes');
app.use('/ports', portRoutes);

// ✅ DB bağlantısı
const pool = require('./config/db');

// Ana endpoint
app.get('/', (req, res) => {
  res.send('Port Backend API çalışıyor');
});

// DB test endpoint
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
