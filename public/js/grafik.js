const sampleData = {
  labels: ['Gereken Otobüs', 'Gereken Durak', 'Kategori 3', 'Toplam Maliyet'],
  datasets: [
    {
      label: 'Veri Seti 1',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      data: [12, 19, 3, 5], // Buraya veritabanından çekilen verileri ekleyin
    },
  ],
};

// Canvas elementini seç
const ctx = document.getElementById('myBarChart').getContext('2d');

// Bar grafiğini oluştur
const myBarChart = new Chart(ctx, {
  type: 'bar',
  data: sampleData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
