const router=require('express').Router()
const {konum_getir,durak_getir,durakKaydet,tum_guzergah,hat_kaydet,hat_durak, durak_sil,izban_getir,metro_getir}=require('../controllers/controller')

router.get('/konum_getir/:hatNo',konum_getir)
router.get('/durak_getir/:hatNo',durak_getir)
router.get('/tum_guzergah',tum_guzergah)
router.post('/durak_kaydet',durakKaydet)
router.post('/hat_kaydet',hat_kaydet)
router.post('/hat_durak',hat_durak)
router.delete("/sil_marker/:markerId",durak_sil)
router.get("/izban_getir",izban_getir)
router.get("/metro_getir",metro_getir)

module.exports=router