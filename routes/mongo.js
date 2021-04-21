require('dotenv').config();
var path = require('path')
var express = require('express');
var router = express.Router();

/* Makes a new post */
router.post('/new', async (req, res, next) => {
  let client = req.client;
  try {
    console.log(req.body);
    let insert = await insertPost(client, process.env.DB, "posts", {
      "url": req.body.url,
      "desc": req.body.desc,
      "comments": []
    })
    res.redirect('/');
  } catch (e) {
    next(e)
  }
});

// Helper: Inserts one post into the Mongo Database
async function insertPost(client, database, collection, post) {
  try{
      const result = await client.db(database).collection(collection).insertOne(post);
  } catch (e) {
      console.error(e)
  }
}

module.exports = router;