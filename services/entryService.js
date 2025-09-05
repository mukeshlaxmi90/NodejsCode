// services/entrypageService.js
const db = require('../Conn_db/connection');

exports.saveUserData = async (name, dob, age, phone, gender, address, email) => {   
   console.log('Service called');
    try {
        const query = "INSERT INTO entries (name, dob, age, phone, gender, address, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const result = await db.query(query, [name, dob, age, phone, gender, address, email]);    
      console.log("DB Insert Result:", result.rows[0]);
    return result.rows[0]; // PostgreSQL me data rows[] me hota hai
    } catch (err) {
        console.error('DB Insert Error:', err);
        throw err;  // reject करने के लिए error throw करें
    }
};
