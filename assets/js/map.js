var map = new L.map('map').setView([0, 0.0], 2);
var mapElem = document.getElementById("map");

map.options.minZoom = 2;
map.options.maxZoom = 7;
const activeColor   = "rgb(27, 118, 200)";
const inactiveColor = "rgb(74, 74, 74)";

const settings = {
    attribution: 'compromit',
    maxZoom: 8,
    id: '',
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true,
    noWrap: true
}

// --

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var options = {
    position: 'bottomright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 5
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: 'Polygons cannot intersect themselves' // Message that will show when intersect
            }
        },
        circle: false,
        circlemarker: false,
        rectangle: true
    },
    edit: {
        featureGroup: editableLayers,
        edit: true,
        remove: true
    }
};

var drawControl = new L.Control.Draw(options);

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    editableLayers.addLayer(layer);
});

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

// Setting background-color of the map when the baselayer changes
map.addEventListener("baselayerchange", e => mapElem.style.backgroundColor = colors[e.name], true);
  