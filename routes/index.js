var express = require('express');
var router = express.Router();

router.get('/imgur', async (req, res, next) => {
  res.send({"key": process.env.IMGUR_KEY})
});


module.exports = router;
