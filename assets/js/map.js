var map = L.map('map').setView([0, 0.0], 2);
var mapElem = document.getElementById("map");

var rightClickLocationX = 0;
var rightClickLocationY = 0;

map.options.minZoom = 2;
map.options.maxZoom = 7;

const activeColor   = "rgb(27, 118, 200)";
const inactiveColor = "rgb(74, 74, 74)";

var mode = 'none';

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

function setActiveMode(tool) {
    if (tool == mode) {
        document.getElementById(tool).style.color = inactiveColor; 
        mode = 'none';
    } else {
        try {
            document.getElementById(mode).style.color = inactiveColor;
        } catch (error) {
            console.log(error);
        }

        mode = tool;
        document.getElementById(mode).style.color = activeColor;
    }

    if (mode != 'none') {
        document.getElementById('map').style.cursor = 'crosshair';
    } else {
        document.getElementById('map').style.cursor = '';
    }
}

function toggleDrawShape() {
    
}

function onClick(e) {
    if (mode == 'dropPin') {
        L.marker(e.latlng).addTo(map);
    }
}

map.on('click', onClick);

// Setting background-color of the map when the baselayer changes
map.addEventListener("baselayerchange", e => mapElem.style.backgroundColor = colors[e.name], true);
  