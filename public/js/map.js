
// Harita oluşturun
var map = L.map('map').setView([38.4192, 27.1287],11);

// OpenStreetMap katmanını ekleyin
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Özel bir ikon oluşturun
var metro_icon = L.icon({
  iconUrl: '/img/metro.png',
  iconSize: [20, 20],  // İkon boyutu
  iconAnchor: [16, 32],  // İkon anker noktası
  popupAnchor: [0, -32]  // Popup'ın konumu
});

// MySQL veritabanından enlem ve boylam bilgilerini içeren JSON verisini alın
fetch('/metro_istasyon')
  .then(response => response.json())
  .then(data => {
    // JSON verisinde dolaşarak her bir koordinat için işaretçi ekleyin
    data.forEach(metro_istasyon => {
      const marker = L.marker([metro_istasyon.enlem, metro_istasyon.boylam], { icon:metro_icon }).addTo(map);
      marker.bindPopup(metro_istasyon.ist_adi);
      
      // JSON verisinde dolaşarak polyline oluşturun
      const coordinates = data.map(metro_istasyon => [metro_istasyon.enlem, metro_istasyon.boylam]);
      const polyline = L.polyline(coordinates, {
        color: 'black',
        weight: 6,
        opacity:0
        
      }).addTo(map);
    });
  });

var izban_icon = L.icon({
  iconUrl: '/img/izban.png',
  iconSize: [40, 23],  // İkon boyutu
  iconAnchor: [16, 32],  // İkon anker noktası
  popupAnchor: [0, -32]  // Popup'ın konumu
});

fetch('/izban_istasyon')
.then(response => response.json())
.then(data => {
  // JSON verisinde dolaşarak her bir koordinat için işaretçi ekleyin
  data.forEach(izban_istasyon => {
    const marker = L.marker([izban_istasyon.iz_enlem, izban_istasyon.iz_boylam],{icon:izban_icon}).addTo(map);
    marker.bindPopup(izban_istasyon.iz_adi);
      
      // JSON verisinde dolaşarak polyline oluşturun
    const coordinates = data.map(izban_istasyon => [izban_istasyon.iz_enlem, izban_istasyon.iz_boylam]);
    const polyline = L.polyline(coordinates, {
      color: 'black',
      weight: 8,
      opacity:0,
      height:8
    }).addTo(map);
    });
  });


var customIcon = L.icon({
  iconUrl: '/img/konum.png',
  iconSize: [32,32],
  iconAnchor: [16,32],
  popupAnchor: [0,-32]
});

var markers = [];



function addMarker() {
  var markerName = prompt("İşaretçi için bir isim girin:");
  if (!markerName) return;

  var newMarker = L.marker([38.5037, 27.20], { icon: customIcon, draggable: true }).addTo(map);
  newMarker.bindPopup(markerName).openPopup();
  newMarker.markerName = markerName;
  markers.push(newMarker);
}

function joinPoints() {
  var coordinates = markers.map(marker => marker.getLatLng());
  var polyline = L.polyline(coordinates, { color: 'red' }).addTo(map);
}


function clearMarkers() {
  // Tüm işaretçileri ve çizgileri kaldır
  // Haritayı sıfırlayarak yeniden oluştur
  map.remove();
  map = L.map('map').setView([38.4192, 27.1287], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}
