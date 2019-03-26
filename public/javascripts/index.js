import { start as startMarquee, stop as stopMarquee } from './marquee.js'
import { start as startGameOfLife } from './gameoflife.js'

function initHello () {
  var helloButton = document.getElementById('hello')
  helloButton.addEventListener('click', function (event) {
    if (document.body.classList.contains('active')) {
      document.body.classList.remove('active')
      document.body.style.background = 'none'
      document.getElementById('hello').innerHTML = 'Hello'
    } else {
      window.fetch('/gifs')
        .then(function (response) {
          return response.json()
        })
        .then(function (responseBody) {
          document.body.classList.add('active')
          document.body.style.background = `url(${responseBody.gifUrl}) no-repeat center center scroll`
          document.body.style.backgroundSize = 'cover'
          document.getElementById('hello').innerHTML = 'H3110'
        })
    }
  })
}

function initMarquees () {
  var marqueeButtons = document.getElementsByClassName('info')
  for (var i = 0; i < marqueeButtons.length; i++) {
    marqueeButtons[i].addEventListener('click', function (event) {
      var marqueeElement = document.getElementById(`${event.target.id}-marquee`)
      if (marqueeElement.classList.contains('hidden')) {
        marqueeElement.classList.remove('hidden')
        startMarquee(marqueeElement)
      } else {
        stopMarquee(marqueeElement)
        marqueeElement.classList.add('hidden')
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initHello()
  initMarquees()
  startGameOfLife()
})
