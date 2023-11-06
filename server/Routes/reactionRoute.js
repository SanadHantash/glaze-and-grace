const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());
const middleware = require('../middleware/authorization');

const reactionController = require('../Controllers/reactionController');

router.post('/reaction/addrate/:id', middleware.authorize,reactionController.addrate);
router.post('/reaction/addcomment/:id', middleware.authorize,reactionController.addcomment);
router.get('/reaction/getcomment/:id', middleware.authorize,reactionController.getcomments);

module.exports = router;
