document.addEventListener('DOMContentLoaded', () => {
  // Sayfa yüklendiğinde çalışacak kodlar buraya gelir

  // Fetch ile Node.js server'dan veri çek
  fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
      // Veriyi al ve grafik oluştur
      createPieChart(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function createPieChart(data) {
  // Veriyi kullanarak pasta grafiği oluştur
  const ctx = document.getElementById('myPieChart').getContext('2d');

  // Saatleri "08:00" formatına dönüştürmek için formatSaat fonksiyonu kullanılıyor
  const labels = data.map(item => formatSaat(item.gidis_saat));
  const percentages = data.map(item => item.sefer_sayisi);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels:labels,
      datasets: [{
        data: percentages,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(231, 233, 237, 0.7)',
          'rgba(132, 211, 75, 0.7)',
          'rgba(255, 191, 0, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Sefer Saatlerine Göre Yüzdelik Dağılım'
      },
      plugins:{
        legend:{
          labels:{
            color:"black"
          }
        }
      }
    }
  });
}

// Saati formatlamak için kullanılan fonksiyon
function formatSaat(saat) {
  const [saatStr, dakikaStr] = saat.split(':');
  const formattedSaat = `${parseInt(saatStr, 10)}:${dakikaStr}`;
  return formattedSaat;
}
