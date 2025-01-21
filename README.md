Module 15 Challenge | Earthquake Visualization

![Logo](https://github.com/mlbybee/Leaflet-challenge/blob/main/Images/1-Logo.png)

Project Overview:
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Programming and Concepts Used:
* Leaflet
* GeoJSON
* Map Objects
* Tile Layers
* Javascript
* HTML
* CSS

Deployment Link: [LINK] (https://mlbybee.github.io/Leaflet-challenge/index.html)

PART 1: Create the Earthquake Visualization
1) Get your dataset
* The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize.
![Data](https://github.com/mlbybee/Leaflet-challenge/blob/main/Images/3-Data.png)

* When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.
![JSON](https://github.com/mlbybee/Leaflet-challenge/blob/main/Images/4-JSON.png)

2) Import and visualize the data:
Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

* Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
* Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

Hint: The depth of the earth can be found as the third coordinate for each earthquake.

* Include popups that provide additional information about the earthquake when its associated marker is clicked.
![Image](https://github.com/mlbybee/Leaflet-challenge/blob/main/Images/PopUp.png)

* Create a legend that will provide context for your map data.

PART 2: Gather and Plot More Data
1) Get your dataset
* Data on tectonic plates can be found at [Tectonic Plates](https://github.com/fraxen/tectonicplates)

2) Optional
* Plot the tectonic plates dataset on the map in addition to the earthquakes
* Add other base maps to choose from.
* Put each dataset into separate overlays that can be turned on and off independently

![Image](https://github.com/mlbybee/Leaflet-challenge/blob/main/Images/earthquakeandplates.png)

Support Received: XpertLearning, GitHub, StackOverflow
