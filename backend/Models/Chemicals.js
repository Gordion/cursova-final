const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chemicals = new Schema(
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
    collection: "chemicals",
  }
);

module.exports = mongoose.model("Chemicals", Chemicals);
