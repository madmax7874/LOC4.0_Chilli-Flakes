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
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide a valid email",],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  list:[{
    text: {
      type : String,
      required: true,
    },
    isDone : {
      type : Boolean,
      required: true,
    },
  }],
  details:[{
    travelDates: {
      type: Array,
      required:true
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    perDayDetails:[{
      morningPlace:{
        type: String,
        required: true,
      },
      morningFood:{
        type: String,
        required: true, 
      },
      nightPlace:{
        type: String,
        required: true,
      },
      nightFood:{
        type: String,
        required: true,
      }
    }]
  }],
  expense:[{
    category:{
      type : String,
      required: true,
    },
    text: {
      type : String,
      required: true,
    },
    amount : {
      type : Number,
      required: true,
    },
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
