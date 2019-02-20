import { start as startMarquee, stop as stopMarquee } from './marquee.js'

function init () {
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
  init()
})
