const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AirPollutionSchema = new Schema(
  {
    date: {
      type: String,
    },
    pm10: {
      type: String,
    },
    pm25: {
      type: String,
    },
  },
  {
    collection: "airpollutions",
  }
);

module.exports = mongoose.model("AirPollution", AirPollutionSchema);
