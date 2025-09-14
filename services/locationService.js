const db = require('../Conn_db/connection');
  console.log("L8");
const saveLocation = (lat, lon, address,localIP) => {
  console.log('location called', lat, lon, address,localIP);
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO user_locations (latitude, longitude, address,ip_address) VALUES ($1, $2, $3,$4) RETURNING id";
    db.query(sql, [lat, lon, address,localIP], (err, result) => {
      if (err) return reject(err);
      resolve(result.rows[0].id); // Postgres में insertId  होता hai
    });
  });
};
module.exports = saveLocation;