const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let statisticSchema = new Schema(
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
    collection: "statistics",
  }
);

module.exports = mongoose.model("Statistic", statisticSchema);
