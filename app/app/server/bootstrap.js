if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval(function () {
      // Initiate HTTP request
      HTTP.get("http://192.168.4.1", function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result.data);
          var result = result.content;
          Turbulence.insert({
            'magnitude': result.magnitude,
            'timestamp': Math.round((new Date()).getTime() / 1000)
          });
        }
      });
    }, 1000);
  })
}