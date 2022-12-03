require('dotenv').config();
const { body } = require('express-validator');
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* Makes a new post */
router.post('/new', body('desc').escape(), async (req, res, next) => {
  let client = req.client;
  try {
    if (req.body.url === "") throw new Error("Please include an image!")
    let insert = await insertPost(client, process.env.DB, "posts", {
      "url": req.body.url,
      "desc": req.body.desc,
      "comments": []
    })
    res.redirect('/chat.html');
  } catch (e) {
    if (e.message === "Please include an image!") {
      res.status(422).send(`Please include an image! <a href='/'>Home</a>`)
    }
    next(e)
  }
});

router.post('/submitorder', body('desc').escape(), async (req, res, next) => {
  let client = req.client;
  try {
    let order = req.body
    delete order.desc;

    let insert = await insertPost(client, process.env.DB, "orders", order)

    res.status(200).send;
  } catch (e) {
    next(e)
  }
});

router.get('/all', async (req, res, next) => {
  let client = req.client;
  try {
    let data = await readCollection(client, process.env.DB, "posts", {})
    res.send({"posts" : data});
  } catch (e) {
    next(e)
  }
});

router.get('/quizQs/all', async (req, res, next) => {
  let client = req.client;
  try {
    let data = await readCollection(client, process.env.DB, "quizQs", {})
    res.send({"quizQs" : data});
  } catch (e) {
    next(e)
  }
});

router.get('/tindogImages/all', async (req, res, next) => {
  let client = req.client;
  try {
    let data = await readCollection(client, process.env.DB, "tindogImages", {})
    res.send({"tindogImages" : data});
  } catch (e) {
    next(e)
  }
});

router.post('/addComment', body('comment').escape(), async (req, res, next) => {
  let client = req.client;
  console.log(req.body);
  try {
    let id = req.body.imgId;
    let comment = req.body.comment;
    let update = await findAndUpdate(client, process.env.DB, "posts", id,
                                    {"$push" : {"comments": comment}})
    res.redirect('/chat.html');
  } catch (e) {
    next(e)
  }
});

router.get('/marketplace', async (req, res, next) => {
  let client = req.client;
  try {
    let data = await readCollection(client, process.env.DB, "products", {})
    res.send({"products" : data});
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

// Helper: Grabs all docs from a collection given a query
async function readCollection(client, database, collection, search) {
  const cursor = await client.db(database).collection(collection).find(search)
  const results = await cursor.toArray();
  return results;
}

async function findAndUpdate(client, database, collection, id, update) {
  try{
      const result = await client.db(database).collection(collection)
                           .findOneAndUpdate({"_id" : ObjectID(id)}, update);
  } catch (e) {
      console.error(e)
  }
}
module.exports = router;
