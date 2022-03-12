const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

router.route("/").get(protect , async(req,res) => {
  res.status(200).send(true);
});



module.exports = router;
