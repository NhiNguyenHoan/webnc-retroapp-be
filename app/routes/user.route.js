const express = require('express');
const { findOne } = require('../models/user.model');
const router = express.Router();
const User = require('../models/user.model');
const hash = require('../middlewares/hashPassword');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send(req.body);
})
router.post("/createUser", async (req, res) => {
  
  if (req.body) {
    const iuser = await User.findOne({
      username: req.body.username,
    })
    if(iuser){

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
module.exports = router;
