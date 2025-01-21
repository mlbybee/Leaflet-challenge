// Load the GeoJSON data and tectonic plates data
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicplatesData = "https://raw.githubusercontent.com/fraxen/tectonicplates/refs/heads/master/GeoJSON/PB2002_boundaries.json";

// Create our map, giving it the satellite map and earthquakes layers to display on load
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
});

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Function to determine marker color by depth
function chooseColor(depth) {
    console.log("Depth data:", depth); // Log the depth
    if (depth < 10) return "#add8e6";
    else if (depth < 30) return "#87cefa";
    else if (depth < 50) return "#6495ed";
    else if (depth < 70) return "#4169e1";
    else if (depth < 90) return "#0000cd";
    else return "#00008b";
}

// Function to establish magnitude size
function mapRadius(mag) {
    console.log("Magnitude:", mag); // Log the magnitude
    if (mag === 0) {
        return 1; // Minimum size for no magnitude
    } else if (mag < 1) {
        return 2; // Slightly larger for small magnitudes
    }
    return Math.max(mag * 30000, 5); // Scale the size for larger magnitudes
}

// Perform a GET request to the query URL
d3.json(geoData).then(function (data) {
    // Log the data retrieved
    console.log("Geo Data:", data)
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
}).catch(function (error) {
    console.error("Error loading the GeoJSON data: ", error);
});

function createFeatures(earthquakeData) {
    console.log("Earthquake data:", earthquakeData); // Log the entire data set

    // Define a function that we want to run for each feature 
    // Give each feature a popup that describes details of the earthquake
    function onEachFeature(feature, layer) {
        console.log(feature); // Check the structure of the feature
        // Bind the popup to the layer
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,

        // When the cursor touches the map features, the event calls this function
        pointToLayer: function (feature, latlng) {

            // Determine the style of markers based on properties
            let markers = {
                radius: mapRadius(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.8,
                color: "black",
                weight: 1
            }
            return L.circle(latlng, markers);
        }
    });

    // Send our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create layer for tectonic plates
  tectonicPlates = new L.layerGroup();

    // Perform a GET request to the tectonicplatesURL
    d3.json(tectonicplatesData).then(function (plates) {

        // Console log the data retrieved 
        console.log(plates);
        L.geoJSON(plates, {
            color: "green",
            weight: 2
        }).addTo(tectonicPlates);
    });

    // Create a baseMaps object to hold the streetmap layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlay object to hold our overlay
    let overlayMaps = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": tectonicPlates
    };

    // Set up the legend
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depth = [0, 10, 30, 50, 70, 90]; 
        let labels = [];
        let legendInfo = "<h4>Depth</h4>";

    div.innerHTML = legendInfo

    for (let i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<ul style="background:' + chooseColor(depth[i] + 1) + '"></i> ' + 
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
};

    // Add legend to the map
    legend.addTo(myMap);

    // Create a layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};