let myBarChart; // Chart nesnesini global bir değişken olarak tanımla
let myBarChartB;
function ger_otobus() {
  const hat_id = document.getElementById('hat_id').value;
  fetch(`api/ger_otobus/${hat_id}`)
    .then(response => response.json())
    .then(veriler => {
      gereken_otobus = veriler[0].gereken_otobus_sayisi;
      olusturGrafik(); // Grafik oluşturan fonksiyonu çağır
    })
    .catch(error => console.error('Hata:', error));
}

function ger_otobusB() {
  const hat_id = document.getElementById('hat_idB').value;
  fetch(`api/ger_otobusB/${hat_id}`)
    .then(response => response.json())
    .then(veriler => {
      gereken_otobusB = veriler[0].gereken_otobus_sayisi;
      olusturGrafikB(); // Grafik oluşturan fonksiyonu çağır
    })
    .catch(error => console.error('Hata:', error));
}

function olusturGrafik() {
  const hat_id = document.getElementById('hat_id').value;
  fetch(`api/ger_durak/${hat_id}`)
    .then(response => response.json())
    .then(veriler => {
      durak_sayisi = veriler[0].durak_sayisi;

      const sampleData = {
        labels: ['Gereken Otobüs Sayısı', 'Gereken Durak Sayısı', 'Durak Maliyeti(Bin TL)', 'Otobüs Maliyeti(Mn TL)'],
        datasets: [
          {
            label: `Hat Bilgileri`,
            backgroundColor: [
              'rgb(15, 6, 170)',
              'rgb(18, 175, 7)',
              'rgb(127,0,0)',
              'rgb(153, 102, 255)',
            ],
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            data: [gereken_otobus, durak_sayisi,durak_sayisi*10, gereken_otobus * 5],
          },
        ],
      };

      // Canvas elementini seç
      const ctx = document.getElementById('myBarChart').getContext('2d');

      // Eğer grafik zaten varsa, güncelle; yoksa, yeni bir grafik oluştur
      if (myBarChart) {
        myBarChart.data = sampleData;
        myBarChart.update();
      } else {
        myBarChart = new Chart(ctx, {
          type: 'bar',
          data: sampleData,
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                beginAtZero: true,
                max: 50,
                stepSize: 2, // Set the step size to 2
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
          },
        });
      }
    })
    .catch(error => console.error('Hata:', error));
}

function olusturGrafikB() {
  const hat_id = document.getElementById('hat_idB').value;
  fetch(`api/ger_durakB/${hat_id}`)
    .then(response => response.json())
    .then(veriler => {
      durak_sayisiB = veriler[0].durak_sayisi;

      const sampleData = {
        labels: ['Gereken Otobüs Sayısı', 'Gereken Durak Sayısı', 'Durak Maliyeti(Bin TL)', 'Otobüs Maliyeti(Mn TL)'],
        datasets: [
          {
            label: `Hat Bilgileri`,
            backgroundColor: [
              'rgb(0, 0, 170)',
              'rgb(18, 175, 7)',
              'rgb(127, 0, 0)',
              'rgb(153, 102, 255)',
            ],
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            data: [gereken_otobusB, durak_sayisiB, durak_sayisiB*10, gereken_otobusB * 5],
          },
        ],
      };

      // Canvas elementini seç
      const ctx = document.getElementById('myBarChartB').getContext('2d');

      // Eğer grafik zaten varsa, güncelle; yoksa, yeni bir grafik oluştur
      if (myBarChartB) {
        myBarChartB.data = sampleData;
        myBarChartB.update();
      } else {
        myBarChartB = new Chart(ctx, {
          type: 'bar',
          data: sampleData,
          options: {
            // maintainAspectRatio: false,
            // responsive:true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                beginAtZero: true,
                max: 50,
                stepSize: 2, // Set the step size to 2
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
          },
        });
      }
    })
    .catch(error => console.error('Hata:', error));
}