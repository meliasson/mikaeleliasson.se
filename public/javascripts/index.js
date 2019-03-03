import { start as startMarquee, stop as stopMarquee } from './marquee.js'
import { start as startGameOfLife } from './gameoflife.js'

function initHello () {
  var helloButton = document.getElementById('hello')
  helloButton.addEventListener('click', function (event) {
    if (document.documentElement.classList.contains('active')) {
      document.documentElement.classList.remove('active')
      document.documentElement.style.background = 'none'
    } else {
      window.fetch('/gifs')
        .then(function (response) {
          return response.json()
        })
        .then(function (responseBody) {
          document.documentElement.classList.add('active')
          document.documentElement.style.background = `url(${responseBody.gifUrl}) no-repeat center center scroll`
          document.documentElement.style.backgroundSize = 'cover'
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
