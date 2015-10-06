


Meteor.publish('flight', function () {
  return Flight.find();
});