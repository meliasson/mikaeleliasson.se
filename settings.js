var settings = {
  tenor: {
    apiKey: process.env.TENOR_API_KEY,
    searchQueries: process.env.TENOR_SEARCH_QUERIES || ''
  }
}

module.exports = settings
