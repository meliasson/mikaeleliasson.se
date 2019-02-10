function init() {
  var infoElements = document.getElementsByClassName('info');
  for (var i = 0; i < infoElements.length; i++) {
    infoElements[i].addEventListener("click", function(event){
      var infoElement = event.target;
      var marqueeElementId = infoElement.id + '-marquee'
      var marqueeElement = document.getElementById(marqueeElementId);
      marqueeElement.classList.toggle('hidden');
      rightJS.toggle(marqueeElementId);
    });
  }
}

var rightJS = {
  marquees: {},
  toggle: function(elementId) {
    if (rightJS.marquees[elementId]) {
      window.cancelAnimationFrame(rightJS.marquees[elementId]);
      delete rightJS.marquees[elementId];
    } else {
      rightJS.init(elementId);
    }
  },
  init: function(elementId) {
    var outerElement = document.getElementById(elementId);
    outerElement.style.overflow = 'hidden';
    outerElement.style.whiteSpace = 'nowrap';
    var innerElement = outerElement.querySelector('span');
    innerElement.style.position = 'relative';
    innerElement.style.right = '-' + outerElement.offsetWidth + 'px';
    rightJS.loop(innerElement);
  },
  loop: function(innerElement){
    var x = parseFloat(innerElement.style.right);
    x = x + 3;
    var W = innerElement.parentElement.offsetWidth;
    var w = innerElement.offsetWidth;
    if (x > w) x = -W;
    innerElement.style.right = x + 'px';
    var id = requestAnimationFrame(this.loop.bind(this, innerElement));
    rightJS.marquees[innerElement.parentElement.id] = id;
  }
};
