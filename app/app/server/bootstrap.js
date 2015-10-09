if (Meteor.isServer) {
	Meteor.startup(function () {
		Meteor.setInterval(function () {
			// Initiate HTTP request
			var xmlHttp = new XMLHttpRequest();

			// Function to call on GET success
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					var result = JSON.parse(xmlHttp.responseText);
					Turbulence.insert(result.magnitude);
				}
			}

			// Get the info
			xmlHttp.open("GET", "192.168.4.1", true);
			xmlHttp.send(null);

		}, 1000);
	})
}