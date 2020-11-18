const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const hash = require('../middlewares/hashPassword');
const bcrypt = require("bcryptjs");

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  res.send(req.body);
});
router.post("/createUser", async (req, res) => {

  if (req.body) {
    const iuser = await User.findOne({
      username: req.body.username,
    })
    if (iuser) {

      res.sendStatus(422);
    }
    const password = await hash(req.body.password);
    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      password: password,
      idsocial: req.body.idsocial,
    })
    await user.save();
    res.send(user);

  }
  else {
    res.sendStatus(500);

  }
});

router.post("/login", async (req, res) => {
  await User.findOne({ username: req.body.username })
    .then(data => {
      console.log('data',data)
      if (data) {
        bcrypt.compare(req.body.password,data.password, function(err, respone) {
          if(respone)
          {
          res.send(data);
          console.log(data)
          }
      });
      }
      else {
        res.sendStatus(400)
      }

    })
    .catch(err => {
      console.log('login failed', err)
      res.sendStatus(400)

    })
})
module.exports = router;
