const saveLocation = require('../services/locationService');

const saveLocationController = async (req, res) => {
  console.log("L1");
  try {
    const { lat, lon, address } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(",")[0].trim() || req.socket.remoteAddress;  // client IP
    console.log("L2", lat, lon, address,ip);
       
    if (!lat || !lon || !address) {
      console.log("L3");
      return res.status(400).json({ error: "Invalid request" });
    }
    console.log("L4");
    const id = await saveLocation(lat, lon, address,ip);
    console.log("L5", id);
    res.json({ success: true, id ,ip});
    console.log("L6", id);
  } catch (err) {
    console.log("L7");
    console.error("❌ Error saving location:", err);
    res.status(500).json({ error: "Failed to save location" });
  }
};

module.exports = saveLocationController;
