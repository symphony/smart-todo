(() => {
  $(() => {
    // Allows drag scrolling on entire document
    $.dragScroll = function(options) {


      const settings = $.extend({
        scrollVertical: true,
        scrollHorizontal: true,
        cursor: null
      }, options);

      let clicked = false,
        clickY, clickX;

      const updateScrollPos = function(e, el) {
        $('html').css('cursor', 'grabbing');
        const $el = $(el);
        settings.scrollVertical && $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
        settings.scrollHorizontal && $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
      };

      $(document).on({
        'mousemove': function(e) {
          clicked && updateScrollPos(e, this);
        },
        'mousedown': function(e) {
          if ($('article.card:hover').length !== 0 || $('textarea:hover').length !== 0) return; // disable document drag when over these elements
          clicked = true;
          clickY = e.pageY;
          clickX = e.pageX;
        },
        'mouseup': function() {
          clicked = false;
          $('html').css('cursor', 'auto');
        }
      });
    };
    $.dragScroll(); // enable or disable here
  });
})();