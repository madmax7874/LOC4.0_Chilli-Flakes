const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { User, ItemModel, OrderModel } = require("../models/User");

router.route("/").get(protect, async (req, res) => {
  res.status(200).send(true);
});

router
  .route("/store")
  .get(protect, async (req, res, next) => {
    try {
      const items = await ItemModel.find();
      res.status(200).send(items);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, price, quantity } = req.body;
      const item = await ItemModel.create({ name, price, quantity });
      res.status(200).send({ success: true });
    } catch (err) {
      next(err);
    }
  });

router.route("/orders").get(protect, async (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await OrderModel.find({ consumer: decoded.id });
    console.log(orders);
    // res.status(200).send(items);
  } catch (err) {
    next(err);
  }
});

router.route("/order").post(async (req, res, next) => {
  try {
    // consumer - closest distributor
    // item, quantity, payment mode, status

    const { name, price, quantity } = req.body;
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = { _id: decoded.id };
    //check if user is manufracturer
    const item = await ItemModel.create({ name, price, quantity });

    res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
