const pool = require('../config/db');

async function upsertUser({ googleId, email, name, picture }) {
  const result = await pool.query(`
    INSERT INTO users (google_id, email, name, picture)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (google_id) DO UPDATE
    SET email = $2, name = $3, picture = $4
    RETURNING *;
  `, [googleId, email, name, picture]);
  return result.rows[0];
}

module.exports = { upsertUser };
