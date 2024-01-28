var map = L.map('map').setView([38.4192, 27.1287],11);
// OpenStreetMap katmanını ekleyin
function harita_olustur(){
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}
harita_olustur();

// renkler
const renkler = [
  "#8B4513", //
  "#000000", // Siyah
  "#FF0000", // Kırmızı
  "#00FF00", // Yeşil
  "#0000FF", // Mavi
  "#FFFF00", // Sarı
  "#FFA500", // Turuncu
  "#800080", // Mor
  "#008080", // Pembe
  "#808080"  // Gri
];

function yerEkle(enlem, boylam, yerAdi, iconUrl) {
  var custom_icon = L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 25],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const marker = L.marker([enlem, boylam], { icon: custom_icon }).addTo(map);
  marker.bindPopup(yerAdi).openPopup();
}

// Hastane bilgileri
const hastaneBilgileri = [
  { enlem:  38.4562, boylam:27.2101, adi: 'Ege Üniversitesi Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.3948, boylam: 27.0334, adi: 'Dokuz Eylül Üniversitesi Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.422340, boylam: 27.165012, adi: 'Tepecik Eğitim ve Araştırma Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.2940, boylam: 27.1042, adi: 'İzmir Şehir Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.3978, boylam:27.1038, adi: 'Katip Çelebi Üniversitesi Atatürk Eğitim ve Araştırma Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.432503, boylam: 27.149294, adi: 'Ege Sağlık Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem:  38.489300, boylam:27.052500, adi: 'Kent Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.4176, boylam: 27.1289, adi: 'Kardeşkent Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.385372, boylam: 27.165920, adi: 'Buca Seyfi Demirsoy Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.4167, boylam: 27.1423, adi: 'Bornova Şehir Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.434101, boylam: 27.143169, adi: 'Alsancak Devlet Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.394291, boylam: 27.006939, adi: 'Narlidere Devlet Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.2940, boylam: 27.1042, adi: 'Bayraklı Devlet Hastanesi', iconUrl: '/img/hospital.png' },
  { enlem: 38.398346, boylam: 27.126347, adi: 'Karabağlar Devlet Hastanesi', iconUrl: '/img/hospital.png' }
  // Yeni hastaneler buraya eklenebilir
];

// Üniversite bilgileri
const universiteBilgileri = [ 
  { enlem: 38.386284, boylam: 27.170511, adi: 'DEÜ EĞİTİM', iconUrl: '/img/university.png' },
  { enlem: 38.3716, boylam: 27.197, adi: 'DEÜ TINAZTEPE', iconUrl: '/img/university.png' },
  { enlem: 38.388294, boylam: 27.045057, adi: 'İEÜ', iconUrl: '/img/university.png' },
  { enlem: 38.511673, boylam: 27.031418, adi: 'İKÇÜ', iconUrl: '/img/university.png' },
  { enlem: 38.581978, boylam: 26.964029, adi: 'İZBÜ', iconUrl: '/img/university.png' },
  { enlem: 38.4575, boylam: 27.2298, adi: 'EÜ', iconUrl: '/img/university.png' },
  { enlem: 38.393539, boylam: 27.073681, adi: 'İzmir Demokrasi Üniversitesi', iconUrl: '/img/university.png' },
  { enlem: 38.581978, boylam:26.964029, adi: 'Bakırçay Üniversitesi', iconUrl: '/img/university.png' },
  { enlem: 38.385330, boylam: 27.181267, adi: 'DEÜ İİBF', iconUrl: '/img/university.png' }
  
];

// Her bir hastane bilgisini haritaya ekleyin
hastaneBilgileri.forEach(hastane => {
  yerEkle(hastane.enlem, hastane.boylam, hastane.adi, hastane.iconUrl);
});

// Her bir üniversite bilgisini haritaya ekleyin
universiteBilgileri.forEach(universite => {
  yerEkle(universite.enlem, universite.boylam, universite.adi, universite.iconUrl);
});


function temizleDuraklar() {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && layer.options.icon.options.iconUrl === '/img/eshot.png') {
      map.removeLayer(layer);
    }
  });
}


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
  // map.eachLayer(layer => {
  //   if (layer instanceof L.Marker || layer instanceof L.Popup) {
  //     layer.remove();
  //   }
  // });
  temizleDuraklar()
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
  // Silinecek marker'ın ID'sini gönder
  fetch(`/api/sil_marker/${markerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    // Silme talebini JSON formatında gönder
    body: JSON.stringify({ markerId }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      alert(data.message)
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
    // icon: yeni_durak
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

function izban_getir(){
  var izban_icon = L.icon({
    iconUrl: '/img/izban.png',
    iconSize: [40, 23],  // İkon boyutu
    iconAnchor: [16, 32],  // İkon anker noktası
    popupAnchor: [0, -32]  // Popup'ın konumu
  });
  
  fetch('api/izban_getir')
  .then(response => response.json())
  .then(data => {
    // JSON verisinde dolaşarak her bir koordinat için işaretçi ekleyin
    data.forEach(izban_istasyon => {
      const marker = L.marker([izban_istasyon.iz_enlem, izban_istasyon.iz_boylam],{icon:izban_icon}).addTo(map);
      marker.bindPopup(izban_istasyon.iz_adi);
      });
    });
}

function metro_getir(){
  var metro_icon = L.icon({
    iconUrl: '/img/metro.png',
    iconSize: [15,10 ],  // İkon boyutu
    iconAnchor: [5, 10],  // İkon anker noktası
    popupAnchor: [0, -32]  // Popup'ın konumu
  });
  
  fetch('api/metro_getir')
  .then(response => response.json())
  .then(data => {
    // JSON verisinde dolaşarak her bir koordinat için işaretçi ekleyin
    data.forEach(metro_getir => {
      const marker = L.marker([metro_getir.enlem,metro_getir.boylam],{icon:metro_icon}).addTo(map);
      marker.bindPopup(metro_getir.ist_adi);
      });
    });
}

// function tum_hatlar() {
//   fetch(`api/tum_guzergah`)
//     .then(response => response.json())
//     .then(veriler => {
//       // Hat numarasına göre konumları grupla
//       const gruplanmisKonumlar = gruplaKonumlar(veriler);

//       // Gruplanmış konumlar üzerinde döngü yaparak çizgileri oluştur
//       gruplanmisKonumlar.forEach(grup => {
//         const polyline = L.polyline(grup.map(konum => [konum.enlem, konum.boylam]), { color: "blue" ,weight:5}).addTo(map);

//         // Çizgiye tıklandığında hat numarasını gösteren etiket ekle
//         polyline.on('click', function (event) {
//           const hatNo = grup[0].hat_no; // Hat numarasını ilk konumdan alabiliriz
//           const popup = L.popup().setLatLng(event.latlng).setContent(`Hat No: ${hatNo}`).openOn(map);
//         });

//         // Harita görünen alanı polyline'a sığacak şekilde ayarla
//         map.fitBounds(polyline.getBounds());
//       });
//     })
//     .catch(error => console.error('Hata:', error));
// }

// function gruplaKonumlar(veriler) {
//   const gruplar = {};
//   veriler.forEach(konum => {
//     const hatNo = konum.hat_no;

//     if (!gruplar[hatNo]) {
//       gruplar[hatNo] = [];
//     }

//     gruplar[hatNo].push(konum);
//   });

//   return Object.values(gruplar);
// }

function tum_hatlar() {
  fetch(`api/tum_guzergah`)
    .then(response => response.json())
    .then(veriler => {
      // Hat numarasına göre konumları grupla
      const gruplanmisKonumlar = gruplaKonumlar(veriler);

      // Her hat için farklı renkleri içeren bir dizi
      const renkler = ["blue","black"];

      // Gruplanmış konumlar üzerinde döngü yaparak çizgileri oluştur
      gruplanmisKonumlar.forEach((grup, index) => {
        const renk = renkler[index % renkler.length]; // Renk dizisinde dolaş

        const polyline = L.polyline(grup.map(konum => [konum.enlem, konum.boylam]), { color: renk, weight: 5 }).addTo(map);

        // Çizgiye tıklandığında hat numarasını gösteren etiket ekle
        polyline.on('click', function (event) {
          const hatNo = grup[0].hat_no; // Hat numarasını ilk konumdan alabiliriz
          const popup = L.popup().setLatLng(event.latlng).setContent(`Hat No: ${hatNo}`).openOn(map);
        });

        // Harita görünen alanı polyline'a sığacak şekilde ayarla
        map.fitBounds(polyline.getBounds());
      });
    })
    .catch(error => console.error('Hata:', error));
}

function gruplaKonumlar(veriler) {
  const gruplar = {};
  veriler.forEach(konum => {
    const hatNo = konum.hat_no;

    if (!gruplar[hatNo]) {
      gruplar[hatNo] = [];
    }

    gruplar[hatNo].push(konum);
  });

  return Object.values(gruplar);
}
