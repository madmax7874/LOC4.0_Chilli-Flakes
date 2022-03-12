const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please choose a role"],
  },
});

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide name"] },
  quantity: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    distributor: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    manufracturer: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    orderDetails: [
      {
        items: { type: mongoose.Types.ObjectId, ref: "Items" },
        quantity: { type: Number, required: true },
        paymode: { type: String, required: true },
        status: { type: String, default: "Placed" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model("Items", ItemSchema);
const OrderModel = mongoose.model("Orders", OrderSchema);
const User = mongoose.model("Users", UserSchema);

(module.exports = User), OrderModel, ItemModel;
