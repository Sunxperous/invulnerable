/*****************************************************************************/
/* Sleep: Event Handlers */
/*****************************************************************************/
Template.Sleep.events({
});

/*****************************************************************************/
/* Sleep: Helpers */
/*****************************************************************************/
var data = [3, 2, 2, 1, 2, 1, 1, 1, 3, 3];
Template.Sleep.helpers({
  data: function() {
    return data;
  }
});

/*****************************************************************************/
/* Sleep: Lifecycle Hooks */
/*****************************************************************************/
Template.Sleep.onCreated(function () {
});

Template.Sleep.onRendered(function () {
  var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, 400]);
  var chart = d3.select('.sleep')
    .attr('width', 400)
    .attr('height', 400);
  var bar = chart.selectAll('g')
    .data(data)
    .enter().append('g')
      .attr('transform', function(d, i) { return 'translate(' + i * 20 + ', 0)'; });
  bar.append('rect')
    .attr('y', function(d) { return 400 - x(d); })
    .attr('width', 20)
    .attr('height', function(d) { return x(d); });
});

Template.Sleep.onDestroyed(function () {
});
