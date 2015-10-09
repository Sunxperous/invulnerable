/*****************************************************************************/
/* Timeline: Event Handlers */
/*****************************************************************************/
Template.Timeline.events({
});

var startTime = moment('2015-10-10 08:30:00.000+08:00');
var startTimeOffset = '+08:00';
var endTime = moment('2015-10-10 12:30:00.000-08:00');
var endTimeOffset = '-08:00';

var timelineEntriesStartTimeOffset = new ReactiveVar([]);
var timelineEntriesEndTimeOffset = new ReactiveVar([]);
var timelineWidth = new ReactiveVar(0);
var timelineLeft = new ReactiveVar(0);

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
  }
});

/*****************************************************************************/
/* Timeline: Lifecycle Hooks */
/*****************************************************************************/
Template.Timeline.onCreated(function () {

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
