/*****************************************************************************/
/* Sleep: Event Handlers */
/*****************************************************************************/
Template.Sleep.events({
});

/*****************************************************************************/
/* Sleep: Helpers */
/*****************************************************************************/
Template.Sleep.helpers({
  colors: function() {
    return colors;
  },
  move: function() {
    return Sleep.find({}, {limit: maxBars}).fetch();
  },
  sum: function() {
    return {
      light: Sleep.find({level: 3}).count(),
      medium: Sleep.find({level: 2}).count(),
      deep: Sleep.find({level: 1}).count()
    };
  },
  total: function() {
    return Sleep.find({}).count();
  }
});

var polling = 1000; // Milliseconds.
var colors = ['black', '#468966', '#FFB03B', '#EA2E49']; // Index 0 is not used.
var spaceInBetween = 0.618; // Golden ratio.
var maxBars = 20; // Limit of bars to show per chart.
/*****************************************************************************/
/* Sleep: Lifecycle Hooks */
/*****************************************************************************/
Template.Sleep.onCreated(function () {
});

Template.Sleep.onRendered(function () {
  var height = 400;
  var numLevels = colors.length - 1; // How many different levels.


  Tracker.autorun(function() {
    var move = Sleep.find({}, {limit: maxBars, sort: {timestamp: -1}}).fetch();
    // Format chart measurements.
    var x = d3.scale.linear().domain([0, numLevels]).range([0, height]);
    var chart = d3.select('.sleep')
      .attr('width', '90%')
      .attr('height', height);

    // Add new bars for each new data.
    var barNew = chart.selectAll('g').data(move.reverse()).enter().append('g');
    barNew.append('rect');

    // Format bars for existing and new data together.
    var bar = chart.selectAll('g');
    bar.select('rect')
      .attr('height', function(d) { return x(d.level); })
      .attr('y', function(d) { return height - x(d.level); })
      .transition() // Only animate after this point.
      .attr('fill', function(d) { return colors[d.level]; })
      .attr('x', function(d, i) { return (100 / move.length * i) + '%'; })
      .attr('width', (100 * spaceInBetween / move.length) + '%');
  });
});

Template.Sleep.onDestroyed(function () {
});
