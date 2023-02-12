let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
var User = require("./Models/User.js");
var News = require("./Models/News.js");

const studentRoute = require("../backend/routes/student.route");
const userRoute = require("../backend/routes/user.route");
const newsRoute = require("../backend/routes/news.route");
const statRoute = require("../backend/routes/statistics.route");
const bcrypt = require("bcryptjs");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/user", userRoute);
app.use("/news", newsRoute);
app.use("/statistics", statRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const User = new mongoose.model("UserLang", userSchema)

// app.post("/login-student",(req,res)=>{
//     const {email,password} =req.body;
//     User.findone({email:email},(err,user)=>{
//         if(user){
//            if(password === user.password){
//                res.send({message:"login success",user:user})
//            }else{
//                res.send({message:"wrong credentials"})
//            }
//         }else{
//             res.send("not register")
//         }
//     })
// });
// app.post("/create-student",(req,res)=>{
//     console.log(req.body)
//     const {name,email,password} =req.body;
//     User.findOne({email:email},(err,user)=>{
//         if(user){
//             res.send({message:"user already exist"})
//         }else {
//             const user = new User({name,email,password})
//             user.save(err=>{
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.send({message:"sucessfull"})
//                 }
//             })
//         }
//     })

// })

// const usersSchema = new mongoose.Schema({
//   name: String,
//   password: String,
// });

// const User = new mongoose.model("User", usersSchema);

// app.post("/get-news", (req, res) => {
//   const { name, password } = req.body;
//   User.findone({ name: name }, (err, user) => {
//     if (user) {
//       if (password === user.password) {
//         res.send({ message: "login success", user: user });
//       } else {
//         res.send({ message: "wrong credentials" });
//       }
//     } else {
//       res.send("not register");
//     }
//   });
// });

app.post("/login-user", (req, res) => {
  const { name, password } = req.body;
  User.findone({ name: name }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login success", user: user });
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not register");
    }
  });
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  User.findOne({ name: name }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new User({ name, password });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfull" });
        }
      });
    }
  });
});
