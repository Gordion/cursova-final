const Statistic = require("../Models/Statistic");
const bcrypt = require("bcrypt");
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// router.get("/get-news", async (req, res) => {
//   res.send(News.name);
// });

let statisticSchema = require("../Models/Statistic");

router.route("/").get((req, res) => {
  statisticSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// router.post("/set-statistic", async (req, res) => {
//   const body = req.body;
//   if (!(body.namestat && body.timestamp)) {
//     return res.status(400).send({ error: "Data not formatted properly" });
//   }
//   const statistic = new Statistic(body);

//   statistic.save().then((doc) => res.status(201).send(doc));
// });

router.post("/set-statistic", async (req, res) => {
  console.log("req", req);
  // const statsObject = req.body;
  const { statstype, statsObject } = req.body;
  const { namestat, timestampstat, statslink } = statsObject;
  // var updateResult = { statsObject: statsObject };

  // const { namestat, timestampstat, statslink } = statsObject;

  var updateResult = { statsObject: statsObject };

  // var updateResult = {
  //   statsObject: {
  //     namestat: namestat,
  //     timestampstat: timestampstat,
  //     statslink: statslink,
  //   },
  // };

  //
  var filter = { statstype: statstype };
  var options = { new: true };

  console.log("filter", filter);
  console.log("updateResult", updateResult);

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });

  // const doc = await MyModel.findOne();

  // // Delete the document so Mongoose won't be able to save changes
  // await MyModel.deleteOne({ _id: doc._id });

  // doc.name = "foo";
  // await doc.save();

  // await Statistic.updateMany(
  //   { statstype: "statstype" },
  //   { $set: { statsObject: statsObject } }
  // );
  //

  const doc = await Statistic.findOne({ ...filter });

  // Sets `name` and unsets all other properties
  doc.overwrite({
    name: namestat,
    timestamp: timestampstat,
    statslink: statslink,
    statstype: statstype,
  });
  await doc.save();

  //   const doc = await Person.fin({ _id });
  // doc.overwrite({ name: 'Jean-Luc Picard' });
  // await doc.save();

  // Statistic.findOneAndUpdate(
  //   filter,
  //   updateResult,
  //   // { upsert: true, new: true, rawResult: true },
  //   options,
  //   function (err, doc) {
  //     console.log("err", err);
  //     // console.log(res, "res");
  //     if (err) return res.send(500, { error: err });
  //     return res.send("Succesfully saved.");
  //   }
  // );
});

router.get("/get-cov", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "cov" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-map", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "map" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-vac", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "vac" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-air", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "airstat" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-chem", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "chemstat" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-water", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "waterstat" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.get("/get-air2", async (req, res) => {
  console.log("req", req);
  const { statstype } = req.body;
  var filter = { statstype: "air2stat" };

  Statistic.find(filter, function (err, doc, raw) {
    console.log("text", err, doc, raw);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

// router.post("/get-news", async (req, res) => {
//   console.log("req", req);
//   const { _id } = req.body;
//   var filter = { _id: _id };

//   News.find(filter, function (err, doc) {
//     console.log("text", err, doc);
//     if (err) return res.send(500, { error: err });
//     return res.send(doc);
//   });
// });

// router.route("/").get((req, res) => {
//   newsSchema.find((error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.route("/delete-news/:id").delete((req, res, next) => {
//   newsSchema.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });

// router.post("/set-news", async (req, res) => {
//   const body = req.body;
//   if (!(body.name && body.description)) {
//     return res.status(400).send({ error: "Data not formatted properly" });
//   }
//   const news = new News(body);

//   news.save().then((doc) => res.status(201).send(doc));
// });

// router.post("/create-user", async (req, res) => {
//   const body = req.body;
//   console.log("name", User.find({ name: body.name }).limit(1).size());

//   if (!(body.name && body.password)) {
//     return res.status(400).send({ error: "Data not formatted properly" });
//   }

//   const user = new User(body);

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   user.save().then((doc) => res.status(201).send(doc));
// });

module.exports = router;
