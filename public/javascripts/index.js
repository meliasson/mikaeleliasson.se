var me = me || {}

me.init = function () {
   var marqueeButtons = document.getElementsByClassName('info');
  for (var i = 0; i < marqueeButtons.length; i++) {
    marqueeButtons[i].addEventListener('click', function(event) {
      var marquee = document.getElementById(`${event.target.id}-marquee`);
      if (marquee.classList.contains('hidden')) {
        marquee.classList.remove('hidden');
        me.marquee.start(marquee);
      } else {
        me.marquee.stop(marquee);
        marquee.classList.add('hidden');
      }
    });
  }
}
