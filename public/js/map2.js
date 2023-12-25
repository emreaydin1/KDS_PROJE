var map = L.map('map').setView([38.4192, 27.1287],11);
// OpenStreetMap katmanını ekleyin
function harita_olustur(){
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors'
}).addTo(map);
}
harita_olustur();

// renkler
const renkler = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Cyan', 'Magenta'];

function haritayiGoster() {
  const randomIndex = Math.floor(Math.random() * renkler.length);
  durakGetir();
  const hatNo = document.getElementById('hatNo').value;
  fetch(`api/konum_getir/${hatNo}`)
    .then(response => response.json())
    .then(veriler => {
      // Çizgiyi temsil eden bir polyline oluştur
      const polyline = L.polyline(veriler.map(konum => [konum.enlem, konum.boylam]), { color: renkler[randomIndex] }).addTo(map);
      // Harita görünen alanı polyline'a sığacak şekilde ayarla
      map.fitBounds(polyline.getBounds());
    })
    .catch(error => console.error('Hata:', error));
}

function durakGetir() {
  var eshot_icon = L.icon({
    iconUrl: '/img/eshot.png',
    iconSize: [15,15],  // İkon boyutu
    iconAnchor: [5,10],  // İkon anker noktası
    popupAnchor: [0, -10],  // Popup'ın konumu
  });
  
  const hatNo = document.getElementById('hatNo').value;
  fetch(`api/durak_getir/${hatNo}`)
    .then(response => response.json())
    .then(veriler => {
      veriler.forEach(duraklar=> {
        const marker = L.marker([duraklar.durak_enlem,duraklar.durak_boylam],{icon:eshot_icon}).addTo(map);
        var popup_icerik = `<span id="markerId">${duraklar.dur_id}</span>-${duraklar.durak_adi}
        <br><button onclick="silMarker(${duraklar.dur_id})">Durağı Sil</button>`;
        marker.bindPopup(popup_icerik);
      });
    })
}

function silMarker(markerId) {
  // TODO: Silme işlemini Node.js API'ye gönder
  fetch('/api/sil_marker/:markerId', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ markerId }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Marker'ı haritadan kaldır
      map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.options.icon.options.iconUrl === '/img/eshot.png') {
          // Belirli bir durak ID'sine sahip marker'ı kaldır
          const popupMarkerId = layer.getPopup().getContent().match(/<span id="markerId">(.*)<\/span>/)[1];
          if (popupMarkerId === markerId.toString()) {
            map.removeLayer(layer);
          }
        }
      });
    })
    .catch(error => console.error('Hata:', error));
}

var enlem;
var boylam;
var durak_adi;
var durak_id;

function noktaEkle() {
  durak_adi = document.getElementById('durak_adi').value;
  durak_id = document.getElementById("durak_id").value;

  var yeni_durak = L.icon({
    iconUrl: '/img/yeni_durak.png',
    iconSize: [40, 40],  // İkon boyutu
    iconAnchor: [5, 10],  // İkon anker noktası
    popupAnchor: [0, -10]  // Popup'ın konumu
  });
  var center = map.getCenter();
  // Yeni bir marker oluşturun
  var marker = L.marker(center, {
    draggable: true,
    icon: yeni_durak
  }).addTo(map);

  marker.bindPopup(`${durak_id}-${durak_adi}`).openPopup();

  // Sürükleme olayını dinle
  marker.on('dragend', function (event) {
    const latlng = event.target.getLatLng();
    enlem = latlng.lat;
    boylam = latlng.lng;
  });
}

function kaydet() {
  durak_id = document.getElementById("durak_id").value;
  durak_adi = document.getElementById('durak_adi').value;

  // Eğer gerekli bilgiler eksikse kullanıcıya uyarı ver
  if (!enlem || !boylam || !durak_adi || !durak_id) {
    alert('Lütfen tüm bilgileri doldurun.');
    return;
  }

  // API'ye gönderilecek veri
  const veri = {
    durak_id: durak_id,
    durak_adi: durak_adi,
    enlem: enlem,
    boylam: boylam
  };
  // API'ye POST isteği gönder
  fetch('/api/durak_kaydet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(veri),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      alert("Durak Kaydedildi")
    })
    .catch(error => console.error('Hata:', error));
    hat_durak();
}

function tum_hatlar() {
  const randomIndex = Math.floor(Math.random() * renkler.length);
  fetch(`api/tum_guzergah`)
    .then(response => response.json())
    .then(veriler => {
      // Çizgiyi temsil eden bir polyline oluştur
      const polyline = L.polyline(veriler.map(konum => [konum.enlem, konum.boylam]), { color: renkler[randomIndex] }).addTo(map);
      // Harita görünen alanı polyline'a sığacak şekilde ayarla
      map.fitBounds(polyline.getBounds());
    })
    .catch(error => console.error('Hata:', error));
}

function hat_ekle() {
  hat_num = document.getElementById('hat_num').value;
  hat_adi = document.getElementById("hat_adi").value;
  baslangic = document.getElementById('baslangic').value;
  bitis = document.getElementById("bitis").value;

  // Eğer gerekli bilgiler eksikse kullanıcıya uyarı ver
  if (!hat_num || !hat_adi || !baslangic || !bitis) {
    alert('Lütfen tüm bilgileri doldurun.');
    return;
  }

  // API'ye gönderilecek veri
  const veri = {
    hat_num: hat_num,
    hat_adi: hat_adi,
    baslangic: baslangic,
    bitis: bitis
  };

  // API'ye POST isteği gönder
  fetch('/api/hat_kaydet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(veri),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Hata: ' + data.error); // Hata durumunda uyarı göster
      } else if (data.success) {
        alert(data.message); // Başarılı durumunda uyarı göster
      }
    })
    .catch(error => console.error('Hata:', error));
}

function hat_durak() {
  durak_id = document.getElementById("durak_id").value;
  hat_no = document.getElementById('hat_no').value;
  // API'ye gönderilecek veri
  const veri = {
    durak_id:durak_id,
    hat_no:hat_no
  };
  // API'ye POST isteği gönder
  fetch('/api/hat_durak', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(veri),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => console.error('Hata:', error));
}

