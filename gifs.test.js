const axios = require('axios')
const gifs = require('./gifs')

jest.mock('axios')

test('getRelevant returns gif URL', () => {
  const response = { 'data': { 'results': [{ 'media': [{ 'gif': { 'url': 'foobar.gif' } }] }] } }
  axios.get.mockResolvedValue(response)
  return gifs.getRelevant().then(gifUrl => expect(gifUrl).toMatch(/.gif/))
})

test('getTrending returns gif URL', () => {
  const response = { 'data': { 'results': [{ 'media': [{ 'gif': { 'url': 'foobar.gif' } }] }] } }
  axios.get.mockResolvedValue(response)
  return gifs.getTrending().then(gifUrl => expect(gifUrl).toMatch(/foobar.gif/))
})
