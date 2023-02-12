const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let WaterPollutions = new Schema(
  {
    name: {
      type: String,
    },
    statstype: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    statslink: {
      type: String,
    },
  },
  {
    collection: "waterpollutions",
  }
);

module.exports = mongoose.model("WaterPollutions", WaterPollutions);
