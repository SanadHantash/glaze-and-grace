const express = require('express');
const router = express.Router();

const contactController = require('../Controllers/contactController');


router.post('/contactus', contactController.postcontactus);



module.exports = router;