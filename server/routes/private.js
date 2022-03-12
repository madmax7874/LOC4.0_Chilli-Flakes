const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { User, ItemModel, OrderModel } = require("../models/User");

const distance = (x, y) => {
  return Math.sqrt(
    x.lat * x.lat - y.lat * y.lat + (x.long * x.long - y.long * y.long)
  );
};

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

  //get all orders
router.route("/orders").get(protect, async (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await OrderModel.find({ consumer: decoded.id });
    console.log(orders)
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

//place an order
router.route("/order").post(async (req, res, next) => {
  try {
    const { _id, name, price, quantity } = req.body;
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = { _id: decoded.id };

    const user = await User.findById(userId);
    const manufacturer = await User.find({ role: "manufacturer" });

    const distributors = await User.find({ role: "distributor" });
    let min = 9999;
    let chosendist;
    distributors.map((dist) => {
      const curr = distance(user, dist);
      if (curr < min) {
        min = curr;
        chosendist = dist._id;
      }
    });

    const item = await ItemModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: { quantity: quantity - 1 },
      },
      { new: true }
    );
    const order = await OrderModel.create({
      consumer: userId,
      distributor: chosendist,
      manufacturer: manufacturer._id,
      qrcode: "This is demo",
      item: _id,
      quantity: 1,
      paymode: "Cash",
    });
    // res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
