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

    // Create a legend to display information about our map.
    let info = L.control({
      position: "bottomright"
    });

      // Define color range based on per_capita
   var colorRange = [
    { perCapita: 0, color: 'green' },
    { perCapita: 20, color: 'yellow' },
    { perCapita: 40, color: 'orange' },
    { perCapita: 60, color: 'red' }
  ];

  

    // When the layer control is added, insert a div with the class of "legend".
    info.onAdd = function() {
      let div = L.DomUtil.create("div", "legend");
      let legendHTML = '';
    
      colorRange.forEach(function(item, index) {
        legendHTML += '<div class="legend-item">';
        legendHTML += '<div class="legend-color ' + item.color + '"></div>';
        
        if (index === colorRange.length - 1) {
          legendHTML += '<span class="legend-label">≥ ' + item.perCapita + '</span>';
        } else {
          legendHTML += '<span class="legend-label">' + item.perCapita + ' - ' + colorRange[index + 1].perCapita + '</span>';
        }
    
        legendHTML += '</div>';
      });
    
      div.innerHTML = legendHTML;
      return div;
    };
    
    // Add the info legend to the map.
    info.addTo(myMap);

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
      // Create a popup with information for the city
      let popupContent = "<strong>" + city.location + "</strong><br>";
      popupContent += "Cuisine: " + cuisine + "<br>";
      popupContent += "Per Capita: " + perCapita + "<br>";
      popupContent += "Restaurant Count: " + restaurantCount;
      circle.bindPopup(popupContent);
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