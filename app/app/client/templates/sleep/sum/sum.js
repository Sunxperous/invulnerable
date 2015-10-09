/*****************************************************************************/
/* Sum: Event Handlers */
/*****************************************************************************/
Template.Sum.events({
});

/*****************************************************************************/
/* Sum: Helpers */
/*****************************************************************************/
Template.Sum.helpers({
});

/*****************************************************************************/
/* Sum: Lifecycle Hooks */
/*****************************************************************************/
Template.Sum.onCreated(function () {
});

Template.Sum.onRendered(function () {
  var self = this;
  this.autorun(function() {
    var circle = d3.scale.ordinal().range([0, 1]);
    var svg = d3.select(self.find('.circle'))
      .attr('width', 100)
      .attr('height', 100);
    var arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(30).outerRadius(25);
    var g = svg.select('g')
      .attr('transform', 'translate(50, 50)')
      .select('path')
      .attr('d', arc.endAngle(self.data.sum.get() / 100 * Math.PI * 2));
    var t = svg.select('g').select('text')
      .attr('x', '-0.5em')
      .attr('y', '0.25em')
      .text(self.data.sum.get());
  });
  setTimeout(function() { 
    self.data.sum.set(90);
  }, 1000);
});

Template.Sum.onDestroyed(function () {
});
