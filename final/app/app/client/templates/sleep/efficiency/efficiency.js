/*****************************************************************************/
/* Efficiency: Event Handlers */
/*****************************************************************************/
Template.Efficiency.events({
});

/*****************************************************************************/
/* Efficiency: Helpers */
/*****************************************************************************/
Template.Efficiency.helpers({
  efficiency: function() {
    var sum = Template.instance().data.efficiency;
    var total = sum.light + sum.medium + sum.deep * sum.deep;
    var sleepTime = sum.medium + sum.deep * sum.deep;
    var effi = sleepTime / total * 100;
    var effiInt = Math.floor(effi);
    return effiInt;
  }
});

/*****************************************************************************/
/* Efficiency: Lifecycle Hooks */
/*****************************************************************************/
Template.Efficiency.onCreated(function () {
});

Template.Efficiency.onRendered(function () {
});

Template.Efficiency.onDestroyed(function () {
});
