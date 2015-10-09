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
  colors: function() {
    return colors;
  },
  move: function() {
    console.log(move.get());
    return move.get();
  },
  efficiency: function() {
    return '50%';
  },
  sum: function() {
    return {
      light: new ReactiveVar(10),
      medium: new ReactiveVar(20),
      deep: new ReactiveVar(30)
    };
  }
});

var polling = 1000; // Milliseconds.
var colors = ['black', 'green', 'orange', 'red']; // Index 0 is not used.
var spaceInBetween = 0.618; // Golden ratio.
var maxBars = 12; // Limit of bars to show per chart.
/*****************************************************************************/
/* Sleep: Lifecycle Hooks */
/*****************************************************************************/
Template.Sleep.onCreated(function () {
  original = move.get();
  move.set(original);
  setInterval(function() {
    original.push(Math.floor(Math.random() * 3) + 1);
    if (original.length > maxBars) {
      original.shift();
    }
    move.set(original);
  }, polling);
});

Template.Sleep.onRendered(function () {
  var height = 400;
  var numLevels = colors.length - 1; // How many different levels.

  Tracker.autorun(function() {
    data = move.get();

    // Format chart measurements.
    var x = d3.scale.linear().domain([0, numLevels]).range([0, height]);
    var chart = d3.select('.sleep')
      .attr('width', '90%')
      .attr('height', height);

    // Add new bars for each new data.
    var barNew = chart.selectAll('g').data(data).enter().append('g');
    barNew.append('rect');

    // Format bars for existing and new data together.
    var bar = chart.selectAll('g');
    bar.select('rect')
      .attr('height', function(d) { return x(d); })
      .attr('y', function(d) { return height - x(d); })
      .transition() // Only animate after this point.
      .attr('fill', function(d) { return colors[d]; })
      .attr('x', function(d, i) { return (100 / data.length * i) + '%'; })
      .attr('width', (100 * spaceInBetween / data.length) + '%');
  });
});

Template.Sleep.onDestroyed(function () {
});
