"use strict";

// REQUIRES ============================================================
const router = new require("express").Router();
const userRoutes = require("./user.routes");

// ROUTER USES =========================================================
router.use("/user", userRoutes);

// EXPORTS =============================================================
module.exports = router;