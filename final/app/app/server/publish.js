


Meteor.publish('flight', function () {
  return Flight.find();
});

Meteor.publish('sleep', function () {
  return Sleep.find();
});