/*****************************************************************************/
/* Flight: Event Handlers */
/*****************************************************************************/
Template.Flight.events({
});

/*****************************************************************************/
/* Flight: Helpers */
/*****************************************************************************/
Template.Flight.helpers({
});

/*****************************************************************************/
/* Flight: Lifecycle Hooks */
/*****************************************************************************/
Template.Flight.onCreated(function () {
});

Template.Flight.onRendered(function () {
  $('.timeline').draggable({
    axis: 'x',

    // Restrict the left and right sides of the element to not overshoot the
    // bounds of the container.
    drag: function(event, ui) {
      ui.position.left = Math.min(0, ui.position.left);
      ui.position.left = Math.max($('.timeline').width() / -2, ui.position.left);
    }
  });
});

Template.Flight.onDestroyed(function () {
});
