const request = require('request-promise')
const settings = require('./settings')

function optionsForTrending () {
  return {
    json: true,
    method: 'GET',
    uri: 'https://api.tenor.com/v1/trending',
    qs: {
      key: settings.tenorApiKey,
      limit: 12,
      media_filter: 'minimal'
    }
  }
}

function optionsForRelevant () {
  return {
    json: true,
    method: 'GET',
    uri: 'https://api.tenor.com/v1/search',
    qs: {
      key: settings.tenorApiKey,
      limit: 12,
      media_filter: 'minimal',
      q: 'space cat'
    }
  }
}

function getGif (options) {
  return request(options)
    .then(function (responseBody) {
      return responseBody.results[Math.floor(Math.random() * 10)].media[0].gif.url
    })
    .catch(function () {
      return null
    })
}

function getTrending () {
  const options = optionsForTrending()
  return getGif(options)
}

function getRelevant () {
  const options = optionsForRelevant()
  return getGif(options)
}

const gifs = {
  getRelevant: getRelevant,
  getTrending: getTrending
}

module.exports = gifs
