export function start (element) {
  element.addEventListener('mouseenter', mouseEnterHandler)
  element.addEventListener('mouseleave', mouseLeaveHandler)
  var innerElement = document.createElement('span')
  innerElement.innerHTML = element.innerHTML
  innerElement.style.position = 'relative'
  innerElement.style.right = `-${element.offsetWidth}px`
  element.innerHTML = ''
  element.appendChild(innerElement)
  element.style.overflow = 'hidden'
  element.style.whiteSpace = 'nowrap'
  scroll(element)
}

export function stop (element) {
  element.removeEventListener('mouseenter', mouseEnterHandler)
  element.removeEventListener('mouseleave', mouseLeaveHandler)
  var innerElement = element.querySelector('span')
  element.innerHTML = innerElement.innerHTML
  element.removeAttribute('style')
  window.cancelAnimationFrame(animationFrameRequestIds[element.id])
}

function scroll (element) {
  var innerElement = element.querySelector('span')
  var innerElementRightPosition = parseFloat(innerElement.style.right)
  innerElementRightPosition += 4
  var elementWidth = element.offsetWidth
  var innerElementWidth = innerElement.offsetWidth
  if (innerElementRightPosition > innerElementWidth) {
    innerElementRightPosition = -elementWidth
  }
  innerElement.style.right = `${innerElementRightPosition}px`
  var id = window.requestAnimationFrame(scroll.bind(this, element))
  animationFrameRequestIds[element.id] = id
}

function mouseEnterHandler (event) {
  window.cancelAnimationFrame(animationFrameRequestIds[event.target.id])
}

function mouseLeaveHandler (event) {
  window.requestAnimationFrame(scroll.bind(this, event.target))
}

var animationFrameRequestIds = {}
