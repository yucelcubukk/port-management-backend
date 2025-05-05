const pool = require('../config/db');

// Tüm portları veritabanından alır
const getAllPorts = async () => {
  const result = await pool.query('SELECT * FROM ports ORDER BY port_number ASC');
  return result.rows;
};

// Yeni port ekler
const addPort = async ({ port_number, project_name, application_name, description }) => {
  const result = await pool.query(
    `INSERT INTO ports (port_number, project_name, application_name, description)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [port_number, project_name, application_name, description]
  );
  return result.rows[0];
};

const updatePort = async (id, { port_number, project_name, application_name, description }) => {
    const result = await pool.query(
      `UPDATE ports
       SET port_number = $1, project_name = $2, application_name = $3, description = $4
       WHERE id = $5
       RETURNING *`,
      [port_number, project_name, application_name, description, id]
    );
    return result.rows[0];
  };

const deletePort = async ( id) => {
    const result = await pool.query(
        'DELETE FROM ports WHERE id =$1 RETURNING *',
        [id]
    );
    return result.rows[0];
};




// 💡 Fonksiyonları dışa aktar
module.exports = {
  getAllPorts,
  addPort,
  updatePort,
  deletePort
};

