const express = require('express')
const gifs = require('../gifs')
const router = express.Router()

router.get('/', function (req, res, next) {
  gifs.getRelevant()
    .then(function (gifUrl) {
      res.json({ gifUrl })
    })
})

module.exports = router
