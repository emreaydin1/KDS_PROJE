// kullanici.js

document.getElementById('ekleForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.querySelector('input[name="email"]').value;
    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const sifre = document.querySelector('input[name="sifre"]').value;
  
    // Verileri bir JSON objesine dönüştür
    const data = {
      email: email,
      ad: ad,
      soyad: soyad,
      sifre: sifre
    };
  
    // API'ye POST isteği gönder
    fetch('/api/kullanici_ekle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Kullanıcı eklenirken bir hata oluştu.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Kullanıcı başarıyla eklendi:', data);
      // Başarı durumunda kullanıcı bilgilerini göstermek veya başka bir işlem yapmak için buraya ek kodlar ekleyebilirsiniz.
    })
    .catch(error => {
      console.error('Hata:', error.message);
      // Hata durumunda kullanıcıya bir hata mesajı göstermek veya başka bir işlem yapmak için buraya ek kodlar ekleyebilirsiniz.
    });
  });


  function kullanici_getir() {
    fetch(`/api/kullaniciListele`)
      .then(response => response.json())
      .then(data => {
        const seferSaatleriBody = document.getElementById('kullaniciListe');
        seferSaatleriBody.innerHTML = '';
  
        data.forEach(kullanici => {
          const row = `<tr>
            <td>${kullanici.email}</td>
            <td>${kullanici.ad}</td>
            <td>${kullanici.soyad}</td>
            <td>*******</td>
            <td>
                <button onclick="deleteSeferSaat()">Sil</button>
                <button onclick="updateSeferSaat()">Güncelle</button>
            </td>
          </tr>`;
          seferSaatleriBody.innerHTML += row;
        });
      })
      .catch(error => console.error('Hata:', error));
  }
  

  
  