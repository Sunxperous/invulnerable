if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval(function () {
      // Initiate HTTP request
      HTTP.get("http://192.168.4.1", function (error, result) {
        if (error) {
          console.log(error);
        } else {
          Turbulence.insert({
            'magnitude': result.data.magDiff,
            'timestamp': Math.round((new Date()).getTime())
          });
        }
      });
    }, 333);

    var count = 1;
    var query = Turbulence.find();
    var handle = query.observe({
      addedAt: function (doc, id, before) {
        count++
        count = (count % 15);
        if (count === 0) {
          var disturbance = 0;
          var cur = Turbulence.find({}, {
            skip: (id - 14),
            limit: 15
          });
          cur.forEach(function (tur) {
            if (tur.magnitude !== 0) {
              disturbance++;
            }
          });
          if (disturbance <= 0) {
            Sleep.insert({
              'level': 1,
              'timestamp': cur.fetch()[0].timestamp
            });
          } else if (disturbance > 0 && disturbance < 11) {
            Sleep.insert({
              'level': 2,
              'timestamp': cur.fetch()[0].timestamp
            });
          } else {
            Sleep.insert({
              'level': 3,
              'timestamp': cur.fetch()[0].timestamp
            });
          }
        }
      }
    });
  })
}