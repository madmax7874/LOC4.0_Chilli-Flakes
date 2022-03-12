const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const {User,ItemModel} = require("../models/User");

router.route("/").get(protect , async(req,res) => {
  res.status(200).send(true);
});

router.route("/store").get(protect, async (req, res, next) => { 
  try{
    const items = await ItemModel.find();
    console.log(items)
    res.status(200).send(items);
  }catch(err){
    next(err)
  }
})

module.exports = router;
