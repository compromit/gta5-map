var map = new L.map('map').setView([0, 0.0], 2);
var mapElem = document.getElementById("map");

map.options.minZoom = 2;
map.options.maxZoom = 7;
const activeColor   = "rgb(27, 118, 200)";
const inactiveColor = "rgb(74, 74, 74)";

var optionColorSelected = '#000'

const settings = {
    attribution: 'compromit',
    maxZoom: 8,
    id: '',
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true,
    noWrap: true
}

var editableLayers = new L.FeatureGroup();

map.addLayer(editableLayers);

var options = {
    position: 'bottomright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#000000',
                weight: 5
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            shapeOptions: {
                color: '#000000',
                weight: 5
            },
            drawError: {
                message: 'Polygons cannot intersect themselves' // Message that will show when intersect
            }
        },
        circle: {
            shapeOptions: {
                color: '#000000',
                weight: 5
            }
        },
        circlemarker: false,
        rectangle: {
            shapeOptions: {
                color: '#000000',
                weight: 5
            }
        }
    },
    edit: {
        featureGroup: editableLayers,
        remove: true
    }
}

var drawControl = new L.Control.Draw(options);

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    e.layer.options.color = document.getElementById("colorpicker").value;

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

$("<div id='colorpicker-wrapper'><input type='color' id='colorpicker' value='#0000ff'></div>").appendTo('.leaflet-draw-toolbar:first')

var color_picker = document.getElementById("colorpicker");
var color_picker_wrapper = document.getElementById("colorpicker-wrapper");
color_picker.onchange = function() {
	color_picker_wrapper.style.backgroundColor = color_picker.value;    
}
color_picker_wrapper.style.backgroundColor = color_picker.value;

// Setting background-color of the map when the baselayer changes
map.addEventListener("baselayerchange", e => mapElem.style.backgroundColor = colors[e.name], true);

window.addEventListener('resize', 
	() => map.getViewPort().resize());