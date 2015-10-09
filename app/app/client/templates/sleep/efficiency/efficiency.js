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
    var total = sum.light.get() + sum.medium.get() + sum.deep.get() * sum.deep.get();
    var sleepTime = sum.medium.get() + sum.deep.get() * sum.deep.get();
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
