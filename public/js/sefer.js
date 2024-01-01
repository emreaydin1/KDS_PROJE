function searchSeferSaatleri() {
  const hatNo = document.getElementById('hatNo').value;
  fetch(`/api/sefer_saat_getir/${hatNo}`)
      .then(response => response.json())
      .then(data => displaySeferSaatleri(data))
      .catch(error => console.error('Hata:', error));
}

function displaySeferSaatleri(seferSaatleri) {
  const seferSaatleriBody = document.getElementById('seferSaatleriBody');
  seferSaatleriBody.innerHTML = '';

  seferSaatleri.forEach(sefer => {
      const row = `<tr>
          
          <td>${sefer.hat_no}</td>
          <td>${sefer.gidis_saat}</td>
          <td>${sefer.donus_saat}</td>
          <td>
              <button onclick="deleteSeferSaat(${sefer.hareket_id})">Sil</button>
              <button onclick="updateSeferSaat(${sefer.hareket_id})">Güncelle</button>
          </td>
      </tr>`;
      seferSaatleriBody.innerHTML += row;
  });
}

function addSeferSaat() {
  const hatNo = document.getElementById('hatNoAdd').value;
  const gidisSaat = document.getElementById('gidisSaat').value;
  const donusSaat = document.getElementById('donusSaat').value;

  fetch('/api/sefer_saat_ekle', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hat_no: hatNo, gidis_saat: gidisSaat, donus_saat: donusSaat }),
  })
      .then(response => response.json())
      .then(data => {
          console.log('Başarıyla eklendi:', data.message);
          searchSeferSaatleri(); // Refresh the table after adding
      })
      .catch(error => console.error('Hata:', error));
}

function deleteSeferSaat(seferId) {
  fetch(`/api/sefer_saat_sil/${seferId}`, {
      method: 'DELETE',
  })
      .then(response => response.json())
      .then(data => {
          console.log('Başarıyla silindi:', data.message);
          searchSeferSaatleri(); // Refresh the table after deleting
      })
      .catch(error => console.error('Hata:', error));
}

function updateSeferSaat(seferId) {
  const gidisSaat = prompt('Yeni Gidiş Saati:');
  const donusSaat = prompt('Yeni Dönüş Saati:');

  fetch(`/api/sefer_saat_guncelle/${seferId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gidis_saat: gidisSaat, donus_saat: donusSaat }),
  })
      .then(response => response.json())
      .then(data => {
          console.log('Başarıyla güncellendi:', data.message);
          searchSeferSaatleri(); // Refresh the table after updating
      })
      .catch(error => console.error('Hata:', error));
}