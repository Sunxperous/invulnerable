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
  })
}