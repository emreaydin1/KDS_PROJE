const express = require("express");
const app = express();
require('dotenv/config');
const router=require('./routers')
const bodyParser = require('body-parser');
const { durak_sayisi,sefer_getir} = require("./controllers/controller");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('views'));

//login sayfası
app.get("/", (req, res) => {
    res.render("login.ejs");
});

// Ana sayfa
app.get("/anasayfa", (req, res) => {
    durak_sayisi((veriler) => {
        res.render('index', { veriler });
    });
});
//haritalar
app.get("/harita", (req, res) => {
    res.render("map.ejs");
});
//grafik
app.get("/sefer", (req, res) => {
    res.render("sefer.ejs");
    
})

// Sunucuyu başlat
app.use('/api',router)
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
