var map = L.map('map').setView([0, 0.0], 2);
var mapElem = document.getElementById("map");

const settings = {
    attribution: '',
    maxZoom: 8,
    id: '',
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true,
    noWrap: true
}

const atlas     = L.tileLayer('./assets/map/tiles-atlas/{z}/{x}/{y}.png', settings);
const terrain   = L.tileLayer('./assets/map/tiles-terrain/{z}/{x}/{y}.png', settings);
const satellite = L.tileLayer('./assets/map/tiles-satellite/{z}/{x}/{y}.png', settings);

const colors = {
    'Map': '#12a7d2',
    'Terrain': '#1862ad',
    'Satellite': '#133d6b'
}

var baseLayers = {
    "Map": atlas,
    "Satellite": satellite,
    "Terrain": terrain
};

// Adding the default map and displaying alternate layers
atlas.addTo(map);
L.control.layers(baseLayers).addTo(map);

function onMapClick(e) {
    console.log("hi");
}

map.on('click', onMapClick);

// Setting background-color of the map when the baselayer changes
map.addEventListener("baselayerchange", e => mapElem.style.backgroundColor = colors[e.name], true);
  