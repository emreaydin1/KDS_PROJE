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
        labels: [['Gereken','Otobüs',`${gereken_otobus}`], ['Gereken','Durak',`${durak_sayisi}`],
        ['Durak','Maliyeti',`${durak_sayisi*3} Bin TL`], ['Otobüs' ,'Maliyeti',`${gereken_otobus*5} Mn TL`],
        ['Hat','Uzunluğu',`${(durak_sayisi-1)*0.5} Km`]],
        datasets: [
          {
            label: `Hat Bilgileri`,
            backgroundColor: [
              'rgb(15, 6, 170)',
              'rgb(18, 175, 7)',
              'rgb(127,0,0)',
              'rgb(153, 102, 255)',
              'rgb(54, 54, 54)'
            ],
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            data: [gereken_otobus, durak_sayisi,durak_sayisi*3, gereken_otobus * 5,(durak_sayisi-1)*0.5],
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
                grid: {
                  color: 'rgba(0, 0, 0)', // x eksenindeki ızgara rengi
                  borderWidth: 2 // x eksenindeki ızgara kalınlığı
              },
              ticks: {
                color: 'black', // x eksenindeki etiketlerin rengi
                font: {
                    size: 14 // x eksenindeki etiketlerin font boyutu
                }
            }              
              },
              y: {
                beginAtZero: true,
                max: 100,
                stepSize: 2, // Set the step size to 2
                grid: {
                  color: 'rgba(0, 0, 0)', // y eksenindeki ızgara rengi
                  borderWidth: 1 // y eksenindeki ızgara kalınlığı
              },
              ticks: {
                  color: 'blue', // y eksenindeki etiketlerin rengi
                  font: {
                      size: 13 // y eksenindeki etiketlerin font boyutu
                  }
              }
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
        labels: [['Gereken','Otobüs',`${gereken_otobusB}`], ['Gereken','Durak',`${durak_sayisiB}`],
        ['Durak','Maliyeti',`${durak_sayisiB*3} Bin TL`], ['Otobüs' ,'Maliyeti',`${gereken_otobusB*5} Mn TL`],
        ['Hat','Uzunluğu',`${(durak_sayisiB-1)*0.5} Km`]],
        datasets: [
          {
            label: `Hat Bilgileri`,
            backgroundColor: [
              'rgb(0, 0, 170)',
              'rgb(18, 175, 7)',
              'rgb(127, 0, 0)',
              'rgb(153, 102, 255)',
              'rgb(54, 54, 54)'
            ],
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            data: [gereken_otobusB, durak_sayisiB, durak_sayisiB*3, gereken_otobusB * 5,(durak_sayisiB-1)*0.5],
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
                grid: {
                  color: 'rgba(0, 0, 0)', // x eksenindeki ızgara rengi
                  borderWidth: 2 // x eksenindeki ızgara kalınlığı
              },
              ticks: {
                color: 'black', // x eksenindeki etiketlerin rengi
                font: {
                    size: 14 // x eksenindeki etiketlerin font boyutu
                }
            }              
              },
              y: {
                beginAtZero: true,
                max: 100,
                stepSize: 2, // Set the step size to 2
                grid: {
                  color: 'rgba(0, 0, 0)', // y eksenindeki ızgara rengi
                  borderWidth: 1 // y eksenindeki ızgara kalınlığı
              },
              ticks: {
                  color: 'blue', // y eksenindeki etiketlerin rengi
                  font: {
                      size: 13 // y eksenindeki etiketlerin font boyutu
                  }
              }
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