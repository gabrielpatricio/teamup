function getPosition() {
    nav
}

function mapDraw() {
    var mapElement = document.getElementById('map');
    mapElement.style.display = 'block';

	var options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(function(position) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            disableDefaultUI: true
        });
        
		var url = '/api/getNearbyLobbies?radius=1.5&lat='+position.coords.latitude+'&lon='+position.coords.longitude;
		axios.get(url).then(function(response) {
			for(const lobby of response.data.lobbies) {
                console.log(lobby);
				var marker = new google.maps.Marker({
					position: { lat: lobby.lat, lng: lobby.lon },
					map: map,
					title: lobby.description
				});

    			marker.addListener('click', function() {
                    alert('adoro pila');
        			/*var dialog = document.createElement('dialog');
        			dialog.showModal();*/
    			});
			}
		});
	}, function() {}, options);
}
