const userModel = require('../Models/dashboarduserModel');


async function getallusers(req, res) {
    try {
      const users = await userModel.Users();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(401).json('error in getallusers controller');
    }
  }



  async function updateusers(req, res) {
    
    
    try {
        const userId = req.body.id;
        const newData = req.body;
        const result = await userModel.deleteUser(userId, newData);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(401).json('error in updateusers controller');
    }
  }




module.exports ={
    getallusers,
    updateusers  
};