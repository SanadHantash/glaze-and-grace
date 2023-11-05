const express = require('express');
const router = express.Router();

const dashboarduserController = require('../Controllers/dashboarduserController');


router.get('/getallusers', dashboarduserController.getallusers);
router.put('/updateusers', dashboarduserController.updateusers);



module.exports = router;