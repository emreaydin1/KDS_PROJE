const router=require('express').Router()
const {konum_getir,durak_getir,durakKaydet,
tum_guzergah,hat_kaydet,hat_durak,
durak_sil,izban_getir,metro_getir,
sefer_saat_getir,sefer_saat_ekle,
sefer_saat_sil,sefer_saat_guncelle,
ger_otobus,ger_durak,login,ger_otobusB, kullanici_ekle,kullaniciListele,ger_durakB}=require('../controllers/controller')

router.get('/konum_getir/:hatNo',konum_getir)
router.get('/durak_getir/:hatNo',durak_getir)
router.get('/tum_guzergah',tum_guzergah)
router.post('/durak_kaydet',durakKaydet)
router.post('/hat_kaydet',hat_kaydet)
router.post('/hat_durak',hat_durak)
router.delete("/sil_marker/:markerId",durak_sil)
router.get("/izban_getir",izban_getir)
router.get("/metro_getir",metro_getir)

router.get('/sefer_saat_getir/:hatNo', sefer_saat_getir);
router.post('/sefer_saat_ekle', sefer_saat_ekle);
router.delete('/sefer_saat_sil/:seferId', sefer_saat_sil);
router.put('/sefer_saat_guncelle/:seferId', sefer_saat_guncelle);

router.get('/ger_otobus/:hat_id',ger_otobus)
router.get('/ger_otobusB/:hat_idB',ger_otobusB)
router.get('/ger_durak/:hat_id',ger_durak)
router.get('/ger_durakB/:hat_idB',ger_durakB)

router.post('/kullanici_ekle', kullanici_ekle);
router.get('/kullaniciListele', kullaniciListele);

router.post('/login', login);
module.exports=router