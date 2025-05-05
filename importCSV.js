const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const pool = require('./config/db');

const csvFilePath = path.join(__dirname, 'initialPorts.csv');

const rows = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ mapHeaders: ({ header }) => header.trim().replace('\uFEFF', '') }))
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', async () => {
    console.log(`Toplam ${rows.length} satır okundu.`);

    for (const [index, row] of rows.entries()) {
      const portNumberRaw = row.portNumber?.trim();
      const portNumber = portNumberRaw && !isNaN(Number(portNumberRaw)) ? parseInt(portNumberRaw) : null;
      const projectName = row.projectName?.trim() || null;
      const applicationName = row.applicationName?.trim() || null;
      const description = row.description?.trim() || null;

      if (!portNumber) {
        console.warn(`⚠️ Satır ${index + 1}: Geçersiz veya boş portNumber. Atlandı.`);
        continue;
      }

      try {
        await pool.query(
          `INSERT INTO ports (port_number, project_name, application_name, description)
           VALUES ($1, $2, $3, $4)`,
          [portNumber, projectName, applicationName, description]
        );
        console.log(`✅ Satır ${index + 1}: Port ${portNumber} başarıyla eklendi.`);
      } catch (err) {
        console.error(`❌ Satır ${index + 1}: Port ${portNumber} için ekleme hatası: ${err.message}`);
      }
    }

    console.log("✔️ İşlem tamamlandı.");
  });
