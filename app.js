const express = require("express");
const app = express();
require('dotenv/config');
const router=require('./routers')
const bodyParser = require('body-parser');
// const Chart = require('chart.js');
// const dbConn = require("./db/mysql_connect");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('views'));
// Ana sayfa
app.get("/anasayfa", (req, res) => {
    res.render("index.ejs");
});
//haritalar
app.get("/harita", (req, res) => {
    res.render("map.ejs");
});
//grafik
app.get("/grafik", (req, res) => {
    res.render("xyz.ejs");
});
// // Enlem ve boylam bilgilerini getiren API
// app.get("/metro_istasyon", (req, res) => {
//     const query = "SELECT * FROM metro_istasyon ORDER BY ist_sirasi";
//     dbConn.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching locations:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(results);
//         }
//     });
// });

// app.get("/izban_istasyon", (req, res) => {
//     const query = "SELECT * FROM izban_istasyon ORDER BY iz_sirasi";
//     dbConn.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching locations:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(results);
//         }
//     });
// });


// // chart js Veri çekme endpoint'i
// app.get('/data', (req, res) => {
//     const query = 'SELECT gidis_saat, COUNT(*) as sefer_sayisi FROM otobus_hareket GROUP BY gidis_saat';
//     dbConn.query(query, (err, results) => {
//       if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         // Veriyi JSON formatında gönder
//         res.json(results);
//       }
//     });
//   });

// app.get('/harita/:hatNo', (req, res) => {
//     const hatNo = req.params.hatNo;
  
//     const sql = `SELECT * FROM otobus_guzergah WHERE otobus_guzergah.yon=2 and hat_no = ?`;
  
//     dbConn.query(sql, [hatNo], (err, results) => {
//       if (err) {
//         console.error('MySQL sorgusu hatası: ' + err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
  
//       res.json(results);
//     });
//   });
  

// Sunucuyu başlat
app.use('/api',router)
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});