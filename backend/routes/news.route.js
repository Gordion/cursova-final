const News = require("../Models/News");
const bcrypt = require("bcrypt");
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// router.get("/get-news", async (req, res) => {
//   res.send(News.name);
// });

let newsSchema = require("../Models/News");

router.post("/get-news", async (req, res) => {
  console.log("req", req);
  const { _id } = req.body;
  var filter = { _id: _id };

  News.find(filter, function (err, doc) {
    console.log("text", err, doc);
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
});

router.route("/").get((req, res) => {
  newsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// router.post("/get-lastnews", async (req, res) => {
//   console.log("req", req);
//   const { _id } = req.body;
//   var filter = { _id: _id };

//   News.find(filter, function (err, doc) {
//     console.log("text", err, doc);
//     if (err) return res.send(500, { error: err });
//     return res.send(doc);
//   });
// });

router.get("/get-lastnews", async (req, res) => {
  // console.log("req", req);
  // const { statstype } = req.body;
  // var filter = { statstype: "map" };

  News.findOne()
    .sort({ _id: -1 })
    .exec(function (err, doc) {
      console.log("text", err, doc);
      if (err) return res.send(500, { error: err });
      return res.send(doc);
    });
});

router.route("/delete-news/:id").delete((req, res, next) => {
  newsSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

router.post("/set-news", async (req, res) => {
  const body = req.body;
  if (!(body.name && body.description)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const news = new News(body);

  news.save().then((doc) => res.status(201).send(doc));
});

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
