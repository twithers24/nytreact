const router = require("express").Router();
const bookRoutes = require("./article");

// Book routes
router.use("/article", articleRoutes);

module.exports = router;
