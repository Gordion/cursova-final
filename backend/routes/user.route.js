const User = require("../Models/User");
const News = require("../Models/News");
const bcrypt = require("bcrypt");
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// let studentSchema = require("../models/UserLang");

// let userSchema = require("../models/User");

router.post("/create-student", async (req, res) => {
  const body = req.body;
  console.log("name", User.find({ name: body.name }).limit(1).size());

  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const user = new User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

router.post("/create-user", async (req, res) => {
  const body = req.body;
  console.log("name", User.find({ name: body.name }).limit(1).size());

  if (!(body.name && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const user = new User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// router.post("/login-student", async (req, res) => {
//   const body = req.body;
//   const user = await User.findOne({ email: body.email });
//   if (user) {
//     const validPassword = await bcrypt.compare(body.password, user.password);
//     if (validPassword) {
//       res.status(200).json({ user: user });
//     } else {
//       res.status(400).json({ error: "Invalid Password" });
//     }
//   } else {
//     res.status(401).json({ error: "User does not exist" });
//   }
// });

router.post("/login-user", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ name: body.name });
  console.log(req.body);
  console.log(user);
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);
    // const validPassword = body.password == user.password;
    console.log("isValid", validPassword, body.password, user.password);
    if (validPassword) {
      console.log("---");
      res.status(200).json({ user: user });
    } else {
      console.log("else");
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

// router.post("/user", async (req, res) => {
//   const body = req.body;
//   const user = await User.findOne({ name: body.name });
//   if (user) {
//     const validPassword = await bcrypt.compare(body.password, user.password);
//     if (validPassword) {
//       res.status(200).json({ user: user });
//     } else {
//       res.status(400).json({ error: "Invalid Password" });
//     }
//   } else {
//     res.status(401).json({ error: "User does not exist" });
//   }
// });

router.post("/result", async (req, res) => {
  console.log("req", req);
  const { _id, result } = req.body;

  var updateResult = { result: result };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/listening", async (req, res) => {
  console.log("req", req);
  const { _id, listening } = req.body;
  var updateResult = { listening: listening };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/vocabulary", async (req, res) => {
  console.log("req", req);
  const { _id, vocabulary } = req.body;
  var updateResult = { vocabulary: vocabulary };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/grammar", async (req, res) => {
  console.log("req", req);
  const { _id, grammar } = req.body;
  var updateResult = { grammar: grammar };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/useOfEnglish", async (req, res) => {
  console.log("req", req);
  const { _id, useOfEnglish } = req.body;

  var updateResult = { useOfEnglish: useOfEnglish };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/reading", async (req, res) => {
  console.log("req", req);
  const { _id, reading } = req.body;

  var updateResult = { reading: reading };
  var filter = { _id: _id };

  User.findOneAndUpdate(
    filter,
    updateResult,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.post("/get-lessons", async (req, res) => {
  console.log("req", req);
  const { _id } = req.body;
  var filter = { _id: _id };

  User.find(filter, function (err, doc) {
    console.log("text", err, doc);
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

router.route("/").get((req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/edit-student/:id").get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update-student/:id").put((req, res, next) => {
  studentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

router.route("/delete-student/:id").delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
