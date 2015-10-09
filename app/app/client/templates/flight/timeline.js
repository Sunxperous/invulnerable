/*****************************************************************************/
/* Timeline: Event Handlers */
/*****************************************************************************/
Template.Timeline.events({
});

var startTime = moment('2015-10-10 08:30:00.000+08:00');
var startTimeOffset = '+08:00';
var endTime = moment('2015-10-10 12:30:00.000-08:00');
var endTimeOffset = '-08:00';
var flightDuration = 30000;
var sleepPeriods = [
  {
    startTime: '2015-10-10 14:30:00.000+08:00',
    endTime: '2015-10-10 16:30:00.000+08:00'
  },
  {
    startTime: '2015-10-10 03:30:00.000-08:00',
    endTime: '2015-10-10 10:30:00.000-08:00'
  }
];

var timelineEntriesStartTimeOffset = new ReactiveVar([]);
var timelineEntriesEndTimeOffset = new ReactiveVar([]);
var timelineWidth = new ReactiveVar(0);
var timelineLeft = new ReactiveVar(0);
var flightDurationWidth = new ReactiveVar(0);
var sleepEntries = new ReactiveVar([]);

/*****************************************************************************/
/* Timeline: Helpers */
/*****************************************************************************/
Template.Timeline.helpers({
  startTimeOffset: function() {
    return startTimeOffset;
  },
  endTimeOffset: function() {
    return endTimeOffset;
  },
  timelineEntriesStartTimeOffset: function() {
    return timelineEntriesStartTimeOffset.get();
  },
  timelineEntriesEndTimeOffset: function() {
    return timelineEntriesEndTimeOffset.get();
  },
  timelineWidth: function() {
    return timelineWidth.get();
  },
  timelineLeft: function() {
    return timelineLeft.get();
  },
  flightDurationWidth: function() {
    return flightDurationWidth.get();
  },
  sleepEntries: function() {
    return sleepEntries.get();
  },
  iconPosition: function(left) {
    return left - 15;
  },
  takeoffLeft: function() {
    return -15;
  },
  landingLeft: function() {
    return timelineWidth.get() - 15;
  }
});

/*****************************************************************************/
/* Timeline: Lifecycle Hooks */
/*****************************************************************************/
Template.Timeline.onCreated(function () {
  $('.timeline-container').on('scroll', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
});

Template.Timeline.onRendered(function () {

  var hours = moment(endTime).startOf('hour').diff(moment(startTime).startOf('hour'), 'hours') + 1;
  var windowWidth = $(window).width();

  var thirdDuration = hours / 3.0;

  if (thirdDuration < 6.0) {
    hourWidth = windowWidth / 6.0;
  } else {
    hourWidth = windowWidth / thirdDuration;
  }

  timelineWidth.set(hourWidth * moment(endTime).diff(moment(startTime), 'hours', true));
  timelineLeft.set(windowWidth / 2.0);
  flightDurationWidth.set(flightDuration / (endTime.diff(startTime, 'seconds')) * timelineWidth.get());
  var totalWidth = timelineWidth.get() + windowWidth;

  var entriesStartTimeOffset = [];
  var entriesEndTimeOffset = [];
  var left = windowWidth / 2.0 - 25.0;

  for (var hr = 0; hr <= hours; hr++) {
    var width;
    if (hr === 0) {
      width = (1.0 - startTime.minute() / 60.0) * hourWidth;
      entriesStartTimeOffset.push({
        'time': startTime.utcOffset(startTimeOffset).format('HH:mm'),
        'width': width,
        'left': left
      });
      entriesEndTimeOffset.push({
        'time': startTime.utcOffset(endTimeOffset).format('HH:mm'),
        'width': width,
        'left': left
      });
    } else if (hr === hours) {
      width = (endTime.minute() / 60.0) * hourWidth;
      entriesStartTimeOffset.push({
        'time': endTime.utcOffset(startTimeOffset).format('HH:mm'),
        'width': width,
        'left': left - hourWidth + width
      });
      entriesEndTimeOffset.push({
        'time': endTime.utcOffset(endTimeOffset).format('HH:mm'),
        'width': width,
        'left': left - hourWidth + width
      });
    } else {
      width = hourWidth;
      entriesStartTimeOffset.push({
        'time': moment(startTime).add(hr, 'hours').startOf('hour').utcOffset(startTimeOffset).format('HH:mm'),
        'width': hourWidth,
        'left': left
      });
      entriesEndTimeOffset.push({
        'time': moment(startTime).add(hr, 'hours').startOf('hour').utcOffset(endTimeOffset).format('HH:mm'),
        'width': hourWidth,
        'left': left
      });
    }
    left += width;
  }

  var sleepPeriodEntries = [];

  for (var i = 0; i < sleepPeriods.length; i++) {
    var period = sleepPeriods[i];
    var periodWidth = hourWidth * moment(period.endTime).diff(moment(period.startTime), 'hours', true);
    var periodLeft = hourWidth * moment(period.startTime).diff(moment(startTime), 'hours', true);
    console.log(moment(period.startTime).diff(moment(startTime), 'hours', true));
    sleepPeriodEntries.push({
      'periodWidth': periodWidth,
      'periodLeft': periodLeft,
      'periodEnd': periodLeft + periodWidth
    });
  }

  sleepEntries.set(sleepPeriodEntries);

  var $timeline = $('.timeline');

  $timeline.css('width', totalWidth + 'px');
  timelineEntriesStartTimeOffset.set(entriesStartTimeOffset);
  timelineEntriesEndTimeOffset.set(entriesEndTimeOffset);

  $timeline.draggable({
    axis: 'x',
    containment: [windowWidth - totalWidth,$timeline.position.top,0,$timeline.position.top]
  });
});

Template.Timeline.onDestroyed(function () {
});
