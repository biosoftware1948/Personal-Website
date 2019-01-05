/*
  Although amMap has methods like getAreaCenterLatitude and getAreaCenterLongitude,
  they are not suitable in quite a lot of cases as the center of some countries
  is even outside the country itself (like US, because of Alaska and Hawaii)
  That's why wehave the coordinates stored here
*/

var latlong = {};

latlong["VAN"] = {"latitude":50, "longitude":-123};
latlong["SF"] = {"latitude":38, "longitude":-122};
latlong["SD"] = {"latitude":33, "longitude":-117};
latlong["SEA"] = {"latitude":47.6, "longitude":-122.3};
latlong["PORT"] = {"latitude":45.5, "longitude":-122.7};
latlong["PV"] = {"latitude":20.7, "longitude":-105.22};
latlong["MN"] = {"latitude":45, "longitude":-93};
latlong["ORL"] = {"latitude":28.5, "longitude":-81.4};
latlong["KAN"] = {"latitude":17.4, "longitude":-62};
latlong["ANT"] = {"latitude":16, "longitude":-60};
latlong["GIH"] = {"latitude":43.5, "longitude":-5.6};
latlong["BOS"] = {"latitude": 42.3, "longitude": -71}

var mapData = [
{"code":"VAN" , "name": "Vancouver", "value" : "Hometown", "color":"#C3073F"},
{"code":"SF", "name": "San Francisco", "value" : "Current home", "color":"#C3073F"},
{"code":"SD" , "name":"San Diego", "color":"#C3073F"},
{"code":"PORT", "name":"Portland", "color":"#C3073F"},
{"code":"PV", "name":"Puerto Vallarta", "color":"#C3073F"},
{"code":"MN", "name":"Minneapolis", "color":"#C3073F"},
{"code":"ORL", "name":"Orlando", "color":"#C3073F"},
{"code":"KAN", "name":"St. Kitts and Nevis", "color":"#C3073F"},
{"code":"ANT", "name":"Antigua", "color":"#C3073F"},
{"code":"GIH", "name":"Gijon", "color":"#C3073F"},
{"code":"BOS", "name":"Boston", "color":"#C3073F"},
{"code":"SEA", "name":"Seattle", "color":"#C3073F"}];


// get min and max values
var minBulletSize = 3;
var maxBulletSize = 70;
var min = Infinity;
var max = -Infinity;
for ( var i = 0; i < mapData.length; i++ ) {
  var value = mapData[ i ].value;
  if ( value < min ) {
    min = value;
  }
  if ( value > max ) {
    max = value;
  }
}

// it's better to use circle square to show difference between values, not a radius
var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

// create circle for each country
var images = [];
for ( var i = 0; i < mapData.length; i++ ) {
  var dataItem = mapData[ i ];
  var size;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    size = 3
  }
  else {
    size = 8
  }
  var id = dataItem.code;

  images.push( {
    "type": "circle",
"theme": "light",

    "width": size,
    "height": size,
    "color": dataItem.color,
    "longitude": latlong[ id ].longitude,
    "latitude": latlong[ id ].latitude,
    "title": dataItem.name,
  } );
}

// build map
var map = AmCharts.makeChart( "chartdiv", {
  "type": "map",
  "projection": "eckert6",
  "zoomable": false,
  "panEventsEnabled": false,
  "zoomOnDoubleClick" : false,
  "pan": false,
  "dragMap": false,
  "zoomControl": {
    "zoomControlEnabled": false,
    "homeButtonEnabled": false
  },
  "titles": [ {
    "text": "",
    "size": 14
  }, {
    "text": "",
    "size": 11
  } ],
  "areasSettings": {
    //"unlistedAreasColor": "#000000",
    //"unlistedAreasAlpha": 0.1
  },
  "dataProvider": {
    "map": "worldLow",
    "images": images
  },
  "export": {
    "enabled": false
  }
} );