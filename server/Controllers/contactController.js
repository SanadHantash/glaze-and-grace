const contactModel = require('../Models/contactModel');



async function postcontactus(req, res) {
    
    const { id, name, email, message } = req.body;
    console.log(id, name, email, message)
    try {
        const result = await contactModel.contactus(id, name, email, message);
        //console.log(result);
        res.status(201).json({ message: 'Contact us form data saved successfully!' });
    } catch (error) {
        console.log(error);
        res.status(401).json("error in contact us controller");
    }
  };



  module.exports ={
    postcontactus
};


