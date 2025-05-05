const express = require('express');
const app = express();

app.get('/ports', (req, res) => {
  console.log('>>> /ports çalıştı (MINI)');
  res.json({ message: 'MINI SERVER OK!' });
});

app.listen(7070, () => {
  console.log('Mini sunucu 7070 portunda çalışıyor');
});
