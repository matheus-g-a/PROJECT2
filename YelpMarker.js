    // Create a map object.
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Get a reference to the cuisine and price range dropdown menus
    let cuisineSelect = document.getElementById('cuisine-select');
    let priceSelect = document.getElementById('price-select');

    // Add event listeners to the dropdown menus
    cuisineSelect.addEventListener('change', updateMap);
    priceSelect.addEventListener('change', updateMap);

    // Function to update the map based on the selected cuisine and price range
function updateMap() {
  // Remove all existing circles from the map
  myMap.eachLayer(function (layer) {
    if (layer instanceof L.Circle) {
      myMap.removeLayer(layer);
    }
  });

  // Get the selected cuisine and price range
  var selectedCuisine = cuisineSelect.value;
  var selectedPrice = priceSelect.value.slice(-1); // Extract the last character

   // Define color range based on per_capita
   var colorRange = [
    { perCapita: 0, color: 'green' },
    { perCapita: 20, color: 'yellow' },
    { perCapita: 40, color: 'orange' },
    { perCapita: 60, color: 'red' }
  ];

  

  // Loop through the cities data
  for (let i = 1; i <= Object.keys(citiesData).length; i++) {
    let city = citiesData[i];
    let cuisine = city.cuisine;
    let price = city[selectedPrice];
    let perCapita = city["per_capita" + selectedPrice];
    let restaurantCount = city.total_rest;

    // Check if the city matches the selected cuisine
    if (cuisine === selectedCuisine) {
      // Calculate radius based on restaurant count
      let radius = Math.sqrt(restaurantCount) * 2000;
      let fillColor = getColorBasedOnPerCapita(perCapita, colorRange);

      // Create a circle for the city
      let circle = L.circle([city.latitude, city.longitude], {
        color: fillColor,
        fillColor: fillColor,
        fillOpacity: perCapita / 100,
        radius: radius
      }).addTo(myMap);
    }
  }
}
// Function to get color based on per_capita
function getColorBasedOnPerCapita(perCapita, colorRange) {
  for (let i = colorRange.length - 1; i >= 0; i--) {
    if (perCapita >= colorRange[i].perCapita) {
      return colorRange[i].color;
    }
  }
  return 'green'; // Default color
}
    // Initial map update
    updateMap();