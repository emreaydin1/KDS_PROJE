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

  const values = [durak_id, durak_adi+"(Planlanan)", enlem, boylam];

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
  const { hat_num, hat_adi, baslangic, bitis} = req.body;

  const query = `
    INSERT INTO otobus_hatlari (hat_no, hat_adi, baslangic, bitis)
    VALUES (?, ?, ?, ?)
  `;

  const values = [hat_num, hat_adi+"(Yeni Hat)", baslangic, bitis];

  dbConn.query(query, values, (err, results) => {
    if (err) {
      console.error('MySQL hatası: ' + err.message);
      res.status(500).json({ message: 'MySQL hatası' });
      return;
    }
    console.log('Hat başarıyla eklendi. ID:', results.insertId);
    res.json({ message: 'Hat başarıyla kaydedildi' });
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
  const sql = `SELECT * FROM otobus_guzergah WHERE otobus_guzergah.yon=1 ORDER BY otobus_guzergah.hat_no`;
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


module.exports={konum_getir,durak_getir,durakKaydet,tum_guzergah,hat_kaydet,hat_durak,durak_sil}