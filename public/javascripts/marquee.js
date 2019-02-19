var me = me || {};

me.marquee = {};

me.marquee.start = function (element) {
  element.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
  element.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
  var innerElement = document.createElement('span');
  innerElement.innerHTML = element.innerHTML;
  innerElement.style.position = 'relative';
  innerElement.style.right = `-${element.offsetWidth}px`;
  element.innerHTML = '';
  element.appendChild(innerElement);
  element.style.overflow = 'hidden';
  element.style.whiteSpace = 'nowrap';
  this._scroll(element);
}

me.marquee.stop = function (element) {
  element.removeEventListener('mouseenter', me.marquee._mouseEnterHandler);
  element.removeEventListener('mouseleave', me.marquee._mouseLeaveHandler);
  var innerElement = element.querySelector('span');
  element.innerHTML = innerElement.innerHTML;
  element.removeAttribute('style');
  cancelAnimationFrame(this._animationFrameRequestIds[element.id]);
}

me.marquee._scroll = function (element) {
  var innerElement = element.querySelector('span');
  var innerElementRightPosition = parseFloat(innerElement.style.right);
  innerElementRightPosition += 5;
  var elementWidth = element.offsetWidth;
  var innerElementWidth = innerElement.offsetWidth;
  if (innerElementRightPosition > innerElementWidth) {
    innerElementRightPosition = -elementWidth;
  }
  innerElement.style.right = `${innerElementRightPosition}px`;
  var id = requestAnimationFrame(this._scroll.bind(this, element));
  this._animationFrameRequestIds[element.id] = id;
}

me.marquee._mouseEnterHandler = function (event) {
  cancelAnimationFrame(this._animationFrameRequestIds[event.target.id]);
}

me.marquee._mouseLeaveHandler = function (event) {
  requestAnimationFrame(this._scroll.bind(this, event.target));
}

me.marquee._animationFrameRequestIds = {}
