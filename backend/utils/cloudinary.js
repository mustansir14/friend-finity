const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "k190173",
  api_key: "498248239212862",
  api_secret: "x4n24muL5jQo95pk6kDhBqt_7J4",
});

module.exports = { cloudinary };
