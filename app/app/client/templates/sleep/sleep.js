/*****************************************************************************/
/* Sleep: Event Handlers */
/*****************************************************************************/
Template.Sleep.events({
});

/*****************************************************************************/
/* Sleep: Helpers */
/*****************************************************************************/
var move = new ReactiveVar([3, 2, 2, 1, 2, 1, 1, 1, 3, 3, 1, 2, 3, 1, 2, 3, 3, 2, 1]);
Template.Sleep.helpers({
  move: function() {
    console.log(move.get());
    return move.get();
  }
});

/*****************************************************************************/
/* Sleep: Lifecycle Hooks */
/*****************************************************************************/
Template.Sleep.onCreated(function () {
  move.set([1, 2, 3]);
  setTimeout(function() {
    move.set([3, 2, 1, 3, 2, 1]);
  }, 1000);
});

var colors = ['black', 'red', 'orange', 'green'];
Template.Sleep.onRendered(function () {
  var height = 400;
  Tracker.autorun(function() {
    data = move.get();

    // Format chart measurements.
    var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, height]);
    var chart = d3.select('.sleep')
      .attr('width', '90%')
      .attr('height', height);

    // Add new bars for each new data.
    var barNew = chart.selectAll('g').data(data).enter().append('g');
    barNew.append('rect');

    // Format bars for existing and new data together.
    var bar = chart.selectAll('g');
    bar.select('rect')
      .attr('fill', function(d) { return colors[d]; })
      .attr('x', function(d, i) { return (100 / data.length * i) + '%'; })
      .attr('y', function(d) { return height - x(d); })
      .attr('width', (99 / data.length) + '%')
      .attr('height', function(d) { return x(d); });
  });
});

Template.Sleep.onDestroyed(function () {
});
