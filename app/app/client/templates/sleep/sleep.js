/*****************************************************************************/
/* Sleep: Event Handlers */
/*****************************************************************************/
Template.Sleep.events({
});

var move = new ReactiveVar([]);
/*****************************************************************************/
/* Sleep: Helpers */
/*****************************************************************************/
Template.Sleep.helpers({
  move: function() {
    console.log(move.get());
    return move.get();
  }
});

var polling = 5000; // 5 seconds.
var colors = ['black', 'green', 'orange', 'red'];
var spaceInBetween = 0.618 // Golden ratio.
/*****************************************************************************/
/* Sleep: Lifecycle Hooks */
/*****************************************************************************/
Template.Sleep.onCreated(function () {
  original = move.get();
  move.set(original);
  setInterval(function() {
    original.push(Math.floor(Math.random() * 3) + 1);
    move.set(original);
  }, polling);
});

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
    bar.select('rect').transition()
      .attr('fill', function(d) { return colors[d]; })
      .attr('x', function(d, i) { return (100 / data.length * i) + '%'; })
      .attr('y', function(d) { return height - x(d); })
      .attr('width', (100 * spaceInBetween / data.length) + '%')
      .attr('height', function(d) { return x(d); });
  });
});

Template.Sleep.onDestroyed(function () {
});
