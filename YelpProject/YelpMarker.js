// Create a map object.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// An array containing each city's name, location, and population
let cities = [{
  location: [40.7128, -74.0059],
  name: "New York",
  resturant: 8550405
},
{
  location: [34.0522, -118.2437],
  name: "Los Angeles",
  resturant: 2720546,
  cuisine: 54621,
},
{
  location: [37.7749, -122.4194],
  name: "San Francisco",
  resturant: 2296224
},
{
  location: [25.7617, -80.1918],
  name: "Miami",
  resturant: 3971883
},
{
  location: [47.6062, -122.3321],
  name: "Seattle",
  resturant: 446599
},
{
  location: [33.7490, -84.3880],
  name: "Atlanta",
  resturant: 446599
},
{
  location: [39.7392, -104.9903],
  name: "Denver",
  resturant: 446599
},
{
  location: [41.8781, -87.6298],
  name: "Chicago",
  resturant: 446599
},
{
  location: [32.7767, -96.7970],
  name: "Dallas",
  resturant: 446599
},
];


// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
for (let i = 0; i < cities.length; i++) {
  let city = cities[i];
  L.marker(city.location)
    .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Resturant ${city.resturant.toLocaleString()}</h3>`)
    .addTo(myMap);
};
// Create a circle, and pass in some initial options.
L.circle([32.7767,-96.7970], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);

// Create a circle, chicago and pass in some initial options.
L.circle([41.8781, -87.6298], {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, Denver and pass in some initial options.
L.circle([39.7392, -104.9903], {
  color: "purple",
  fillColor: "purple",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, Atlanta and pass in some initial options.
L.circle([33.7490, -84.3880], {
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, Seattle and pass in some initial options.
L.circle([47.6062, -122.3321], {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, Miami and pass in some initial options.
L.circle([25.7617, -80.1918], {
  color: "magenta",
  fillColor: "magenta",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle,  San Francisco and pass in some initial options.
L.circle([37.7749, -122.4194], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, Los Angeles and pass in some initial options.
L.circle([34.0522, -118.2437], {
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);
// Create a circle, New York and pass in some initial options.
L.circle([40.7128, -74.0059], {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.75,
  radius: 50000
}).addTo(myMap);



