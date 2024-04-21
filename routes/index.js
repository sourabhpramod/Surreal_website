var express = require("express");
var router = express.Router();
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;



/* GET home page. */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwd: String,
  conpasswd: String

})

const UserModel = mongoose.model("user", userSchema)

router.get('/', function (req, res, next) {
  res.render('mainpage', { title: 'Surreal VR/AR' })
})

router.get('/signup', function (req, res, next) {
  res.render('index', { title: 'Signup to Surreal' });
});
router.post('/submit', function (req, res) {
  console.log(req.body)
  mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected");
    const newUser = new UserModel({
      name: req.body.username,
      email: req.body.email,
      passwd: req.body.password,
      conpasswd: req.body.confirmPassword,
    })
    return newUser.save();

  }).catch((error) => console.log("error"))

  res.send('Got it')
});


module.exports = router;
