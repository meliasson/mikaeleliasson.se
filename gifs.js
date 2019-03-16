const axios = require('axios')
const settings = require('./settings')

function optionsForTrending () {
  return {
    params: {
      key: settings.tenorApiKey,
      limit: 12,
      media_filter: 'minimal'
    }
  }
}

function optionsForRelevant () {
  return {
    params: {
      key: settings.tenorApiKey,
      limit: 12,
      media_filter: 'minimal',
      q: 'space cat'
    }
  }
}

function getGif (url, options) {
  return axios.get(url, options)
    .then(function (response) {
      const gifs = response.data.results
      const index = Math.floor(Math.random() * gifs.length)
      return gifs[index].media[0].gif.url
    })
    .catch(function () {
      return null
    })
}

function getTrending () {
  const options = optionsForTrending()
  return getGif('https://api.tenor.com/v1/trending', options)
}

function getRelevant () {
  const options = optionsForRelevant()
  return getGif('https://api.tenor.com/v1/search', options)
}

const gifs = {
  getRelevant: getRelevant,
  getTrending: getTrending
}

module.exports = gifs
