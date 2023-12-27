const express = require('express');
const dbConn=require("../db/mysql_connect")
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const konum_getir=(req,res)=>{
    const hatNo=req.params.hatNo
    const sql = `SELECT * FROM otobus_guzergah WHERE otobus_guzergah.yon=1 and hat_no =?`;
    dbConn.query(sql, [hatNo], (err, results) => {
        if (err) {
          console.error('MySQL sorgusu hatası: ' + err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
}

const durak_getir=(req,res)=>{
  const hatNo=req.params.hatNo
  const sql = `SELECT duraklar.durak_id as dur_id,duraklar.durak_adi,duraklar.enlem as durak_enlem,duraklar.boylam as durak_boylam 
  FROM duraklar,hat_durak,otobus_hatlari WHERE duraklar.durak_id=hat_durak.durak_id 
  and otobus_hatlari.hat_no=hat_durak.hat_no 
  and otobus_hatlari.hat_no=? GROUP BY duraklar.durak_adi;`;
  dbConn.query(sql, [hatNo], (err, results) => {
      if (err) {
        console.error('MySQL sorgusu hatası: ' + err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
}

const durakKaydet = (req, res) => {
  const { durak_id, durak_adi, enlem, boylam } = req.body;

  const query = `
    INSERT INTO duraklar (durak_id, durak_adi, enlem, boylam)
    VALUES (?, ?, ?, ?)
  `;

  const values = [durak_id, durak_adi+"(P)", enlem, boylam];

  dbConn.query(query, values, (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      res.status(500).json({ message: 'MySQL hatası' });
      return;
    }
    console.log('Durak başarıyla eklendi. ID:', results.insertId);
    res.json({ message: 'Durak başarıyla kaydedildi' });
  });
};

const hat_kaydet = (req, res) => {
  const { hat_num, hat_adi, baslangic, bitis } = req.body;

  // Hat numarasının veritabanında var olup olmadığını kontrol et
  const checkQuery = 'SELECT * FROM otobus_hatlari WHERE hat_no = ?';
  dbConn.query(checkQuery, [hat_num], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('MySQL hatası: ' + checkErr.message);
      res.status(500).json({ message: 'MySQL hatası' });
      return;
    }

    // Eğer hat_no zaten varsa uyarı ver
    if (checkResults.length > 0) {
      res.status(400).json({ error: 'Bu hat numarası zaten mevcut' });
      return;
    }

    // Hat_no mevcut değilse ekle
    const insertQuery = `
      INSERT INTO otobus_hatlari (hat_no, hat_adi, baslangic, bitis)
      VALUES (?, ?, ?, ?)
    `;

    const values = [hat_num, hat_adi + '(Y)', baslangic, bitis];

    dbConn.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('MySQL hatası: ' + err.message);
        res.status(500).json({ message: 'MySQL hatası' });
        return;
      }
      console.log('Hat başarıyla eklendi. ID:', results.insertId);
      res.json({ success: true, message: 'Hat başarıyla kaydedildi' });
    });
  });
};

const hat_durak = (req, res) => {
  const { hat_no,durak_id} = req.body;

  const query = `
    INSERT INTO hat_durak (durak_id,hat_no)
    VALUES (?, ?)
  `;

  const values = [durak_id,hat_no];

  dbConn.query(query, values, (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      res.status(500).json({ message: 'MySQL hatası' });
      return;
    }
    console.log('Hat_durak başarıyla eklendi. ID:', results.insertId);
    res.json({ message: 'Hat_durak başarıyla kaydedildi' });
  });
};

const tum_guzergah=(req,res)=>{
  const sql = `SELECT * FROM otobus_guzergah WHERE otobus_guzergah.yon=1 ORDER BY id`;
  dbConn.query(sql,(err, results) => {
      if (err) {
        console.error('MySQL sorgusu hatası: ' + err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
}

const durak_sil=(req,res)=>{
  const markerId = req.params.markerId;

  if (!markerId) {
    return res.status(400).json({ message: 'Geçersiz marker ID.' });
  }

  // Veritabanından marker'ı silme işlemi
  const deleteQuery = 'DELETE FROM duraklar WHERE duraklar.durak_id = ?';
  dbConn.query(deleteQuery, [markerId], (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      return res.status(500).json({ message: 'Marker silme hatası.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Marker bulunamadı.' });
    }

    res.json({ message: 'Marker başarıyla silindi.' });
  });
}

const durak_sayisi = (callback) => {
  const sql1 = "SELECT COUNT(*) as yeni_hat_sayisi from otobus_hatlari WHERE hat_adi LIKE '%(Y)%'";
  const sql="SELECT COUNT(*) as yeni_durak_sayisi from duraklar WHERE durak_adi LIKE '%(P)%'";
  dbConn.query(sql, (err, result) => {
      if (err) {
          console.error('MySQL sorgusu hatası: ' + err);
          callback(0);
          return;
      }
  dbConn.query(sql1, (err, result2) => {
      if (err) {
          console.error('MySQL sorgusu hatası: ' + err);
          callback(0);
          return;
        }
      const yeni_hat=result2[0].yeni_hat_sayisi;
      const yeni_durak = result[0].yeni_durak_sayisi;
      const veriler=[yeni_durak,yeni_hat]
      callback(veriler);
  });
})
};

const izban_getir=(req,res)=>{
  const sql = `SELECT * FROM izban_istasyon`;
  dbConn.query(sql,(err, results) => {
      if (err) {
        console.error('MySQL sorgusu hatası: ' + err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  }

const metro_getir=(req,res)=>{
  const sql = `SELECT * FROM metro_istasyon`;
  dbConn.query(sql,(err, results) => {
      if (err) {
        console.error('MySQL sorgusu hatası: ' + err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
} 


const sefer_saat_getir = (req, res) => {
  const hatNo = req.params.hatNo;
  const sql = `SELECT * FROM otobus_hareket WHERE hat_no = ?`;
  dbConn.query(sql, [hatNo], (err, results) => {
    if (err) {
      console.error('MySQL sorgusu hatası: ' + err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
};

const sefer_saat_ekle = (req, res) => {
  const { hat_no, gidis_saat, donus_saat } = req.body;

  const query = `
    INSERT INTO otobus_hareket (hat_no, gidis_saat, donus_saat)
    VALUES (?, ?, ?)
  `;

  const values = [hat_no, gidis_saat, donus_saat];

  dbConn.query(query, values, (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      res.status(500).json({ message: 'MySQL hatası' });
      return;
    }
    console.log('Sefer saati başarıyla eklendi. ID:', results.insertId);
    res.json({ message: 'Sefer saati başarıyla eklendi' });
  });
};

const sefer_saat_sil = (req, res) => {
  const seferId = req.params.seferId;

  if (!seferId) {
    return res.status(400).json({ message: 'Geçersiz sefer ID.' });
  }

  const deleteQuery = 'DELETE FROM otobus_hareket WHERE id = ?';
  dbConn.query(deleteQuery, [seferId], (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      return res.status(500).json({ message: 'Sefer saati silme hatası.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Sefer saati bulunamadı.' });
    }

    res.json({ message: 'Sefer saati başarıyla silindi.' });
  });
};

const sefer_saat_guncelle = (req, res) => {
  const seferId = req.params.seferId;
  const { gidis_saat, donus_saat } = req.body;

  const updateQuery = 'UPDATE otobus_hareket SET gidis_saat = ?, donus_saat = ? WHERE id = ?';
  dbConn.query(updateQuery, [gidis_saat, donus_saat, seferId], (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      return res.status(500).json({ message: 'Sefer saati güncelleme hatası.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Sefer saati bulunamadı.' });
    }

    res.json({ message: 'Sefer saati başarıyla güncellendi.' });
  });
};


module.exports={konum_getir,durak_getir,durakKaydet,
tum_guzergah,hat_kaydet,hat_durak,durak_sil,durak_sayisi,izban_getir,
metro_getir,sefer_saat_getir,sefer_saat_ekle,sefer_saat_sil,sefer_saat_guncelle}