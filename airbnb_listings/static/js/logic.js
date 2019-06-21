const neighbourhoodselect = document.querySelector("#neighbourhoodselect");
const listingDiv = document.querySelector("#listing");

let dataItems = [];

let points = [];

let sumOfListimgs = 0;

// Creating map object
let myMap = L.map("map", {
    center: [41.8781, -87.6298],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Grab the data with d3
var CSV = "/api/table_analysis"

d3.csv(CSV, function(response) {
  // Create a new marker cluster group
  let markers = L.markerClusterGroup();

  if (response) {
      // Loop through data
      for (let i = 0; i < response.length; i++) {
          dataItems.push(response[i]);

          let popupInfo = "<table>";
          popupInfo = popupInfo + "<tr><td>Reviews per Month: " + response[i].reviews_per_month + "</td></tr>";
          popupInfo = popupInfo + "<tr><td>Number of Reviews: " + response[i].number_of_reviews + "</td></tr>";
          popupInfo = popupInfo + "<tr><td>Availability (1 yr): " + response[i].availability_365 + "</td></tr>";
          popupInfo = popupInfo + "<tr><td>Revenue per Month: " + response[i].monthly_price + "</td></tr>";
          popupInfo = popupInfo + "<tr><td>Maximum Guests: " + response[i].accommodates + "</td></tr>";
          popupInfo = popupInfo + "<tr><td>Listing Url: <a href='" + response[i].listing_url + "' target='_blank'>" + response[i].listing_url + "</a></td></tr>";
          popupInfo = popupInfo + "</table>";

          let LeafIcon = L.Icon.extend({
              options: {
                  shadowUrl: "",
                  iconSize: [18, 30],
                  shadowSize: [18, 30],
                  iconAnchor: [22, 94],
                  shadowAnchor: [4, 62],
                  popupAnchor: [-3, -76]
              }
          });
          let icon;

          if (response[i].room_type == "Entire home/apt") {

              icon = new LeafIcon({ iconUrl:'/static/js/markers/green.png'});
          }
          else if (response[i].room_type == "Private room") {

              icon = new LeafIcon({ iconUrl: '/static/js/markers/red.png' });
          }
          else if (response[i].room_type == "Shared room") {

              icon = new LeafIcon({ iconUrl:'/static/js/markers/orange.png'});
          }
              // Add a new marker to the cluster group and bind a pop-up
          let point = markers.addLayer(L.marker([response[i].latitude, response[i].longitude], { icon: icon })
              .bindPopup(popupInfo));
          points.push(point);
          //}

          sumOfListimgs++;

      }

      // Add our marker cluster layer to the map
      myMap.addLayer(markers);

      // Set the sum of the listings
      listingDiv.innerText = sumOfListimgs;

      // Set up the legend
      let legend = L.control({ position: "topright" });
      legend.onAdd = function () {
          let div = L.DomUtil.create("div", "legend info");

          // LegendInfo room type
          var legendInfo = "<div class='legend_Div'>" + 
              "<h2>Room Type</h2>" +
              "<div class='green' ><h3><b>Entire home/apt</b>: Green</h3></div>" +
              "<div class='red' ><h3><b>Private room: Red</b></h3></div>" +
              "<div class='orange' ><h3><b>Shared room</b>: Orange</h3></div>" +
              "</div>";

          div.innerHTML = legendInfo;

          return div;
      };

      // Adding legend to the map
      legend.addTo(myMap);
  }
});

function neighbourhoodselectEventHandler(event) {

    let val = this.value;
    let filteredDataItems = [];
    sumOfListimgs = 0;

    if (val == "Chicago") {

        filteredDataItems = dataItems;
    }
    else {
        filteredDataItems = dataItems.filter(function (dataItem) {
            return dataItem.neighbourhood.toLowerCase().indexOf(val.toLowerCase()) !== -1;
        });

    }
   
    for (i = 0; i < points.length; i++) {
        myMap.removeLayer(points[i]);
    }
    points = [];

    // Create a new marker cluster group
    let markers = L.markerClusterGroup();

    for (let i = 0; i < filteredDataItems.length; i++) {

        let popupInfo = "<table>";
        popupInfo = popupInfo + "<tr><td>Reviews per Month: " + filteredDataItems[i].reviews_per_month + "</td></tr>";
        popupInfo = popupInfo + "<tr><td>Number of Reviews: " + filteredDataItems[i].number_of_reviews + "</td></tr>";
        popupInfo = popupInfo + "<tr><td>Availability (1 yr): " + filteredDataItems[i].availability_365 + "</td></tr>";
        popupInfo = popupInfo + "<tr><td>Revenue per Month: " + filteredDataItems[i].monthly_price + "</td></tr>";
        popupInfo = popupInfo + "<tr><td>Maximum Guests: " + filteredDataItems[i].accommodates + "</td></tr>";
        popupInfo = popupInfo + "<tr><td>Listing Url: <a href='" + filteredDataItems[i].listing_url + "' target='_blank'>" + filteredDataItems[i].listing_url + "</a></td></tr>";
        popupInfo = popupInfo + "</table>";


        let LeafIcon = L.Icon.extend({
            options: {
                shadowUrl:"",
                iconSize: [18, 30],
                shadowSize: [18, 30],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        });

        let icon;

        if (filteredDataItems[i].room_type == "Entire home/apt") {

            icon = new LeafIcon({ iconUrl: '../Resources/green.png' });
        }
        else if (filteredDataItems[i].room_type == "Private room") {

            icon = new LeafIcon({ iconUrl: '../Resources/red.png' });
        }
        else if (filteredDataItems[i].room_type == "Shared room") {

            icon = new LeafIcon({ iconUrl: '../Resources/orange.png' });
        }

        let point = markers.addLayer(L.marker([filteredDataItems[i].latitude, filteredDataItems[i].longitude], { icon: icon })
            .bindPopup(popupInfo));
        points.push(point);

        sumOfListimgs++;
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

    if (filteredDataItems.length > 0) {
        if (val == "Chicago") {
            myMap.flyTo(new L.LatLng(41.8781, -87.6298), 11);
        }
        else {
        myMap.flyTo(new L.LatLng(filteredDataItems[0].latitude, filteredDataItems[0].longitude), 15);
        }
    }

    // Set the sum of the listings
    listingDiv.innerText = sumOfListimgs;
}

neighbourhoodselect.addEventListener("change", neighbourhoodselectEventHandler); 

