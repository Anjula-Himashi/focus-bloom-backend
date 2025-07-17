const client = require('../config/googleClient');
const { upsertUser } = require('../models/user.model');

async function googleSignIn(req, res) {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const user = await upsertUser({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    });

    res.json({ success: true, user });
  } catch (err) {
  console.error("Google Sign-In Error:", err);
  res.status(401).json({
    success: false,
    error: 'Invalid token',
    details: err.message || err.toString()
  });
}

}

module.exports = { googleSignIn };
