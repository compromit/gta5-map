var map = L.map('map').setView([0, 0.0], 2);

L.tileLayer('./assets/map/tiles-satellite/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 8,
    id: '',
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true,
    noWrap: true
}).addTo(map);

function onMapClick(e) {
    console.log("Clicked", e)
}

map.on('click', onMapClick);