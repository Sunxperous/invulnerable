if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval(function () {
      // Initiate HTTP request
      HTTP.get("http://192.168.4.1", function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result.content.split(":")[1].split("}")[0]);
          Turbulence.insert({
            'magnitude': result.content.split(":")[1].split("}")[0],
            'timestamp': Math.round((new Date()).getTime())
          });
        }
      });
    }, 333);
  })
}