const Reaction = require('../models/reactionsModel'); // Import your model here

const addrate = async (req, res) => {
    const {rate } = req.body;
    const productId = req.params.id;
    const userID = req.user.id;
    try {
        await Reaction.addrate(productId, userID, rate);
      
        res.status(200).json({ success: true, message: 'your rate added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addcomment = async (req, res) => {
    const{comment} = req.body;
    const productId = req.params.id;
    const userID = req.user.id;
    try{
    await Reaction.addcomment(productId,userID,comment);
        res.status(200).json({ success: true, message: 'your comment added successfully' });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getcomments = async (req, res, next) => {
    const productId = req.params.id;
    try {

    
      
      const comments = await Reaction.getcomments(productId);
      res.status(200).json({ success: true, comments });
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting comments' });
    }
  };


module.exports = {
    addrate,
    addcomment,
    getcomments
};






