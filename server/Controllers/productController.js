const productModel = require('../Models/productModel');
// require('dotenv').config();

    async function getproduct(req, res) {
        try {
            // console.log(process.env.DB_PASSWORD);
          const products  = await productModel.products(req.params.id);
          res.status(200).json(products);
          
        } catch (error) {
          // Respond with an error message
          res.status(401).json("error in product controller");
        }
      }


      async function getnewproduct(req, res) {
        try {
            // console.log(process.env.DB_PASSWORD);
          const products = await productModel.newproduct();
          res.json(products);
          
        } catch (error) {
          // Respond with an error message
          console.error(error);
          res.status(401).json("error in getnewproduct controller");
        }
      }



      async function getdiscountproduct(req, res) {
        try {
            // console.log(process.env.DB_PASSWORD);
          const products = await productModel.discountproduct();
          res.json(products);
          
        } catch (error) {
          // Respond with an error message
          console.error(error);
          res.status(401).json("error in getnewproduct controller");
        }
      }


      async function gettopproduct(req, res) {
        try {
            // console.log(process.env.DB_PASSWORD);
          const products = await productModel.topproduct();
          res.json(products);
          
        } catch (error) {
          // Respond with an error message
          console.error(error);
          res.status(401).json("error in getnewproduct controller");
        }
      }


module.exports ={
    getproduct,
    getnewproduct,
    getdiscountproduct,
    gettopproduct
};