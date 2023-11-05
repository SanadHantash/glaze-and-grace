const Dashboard = require('../Models/dashboardModel.js');
var multer  = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: '../../client/src/assets/uploads', 
  filename: function (req, file, cb) {
    cb(null, 'image-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|)$/)) {
      return cb(new Error('Please upload a valid image file'));
    }
    cb(null, true);
  }
}).array('image'); 

  
const createproduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      
      const { product_name, product_detail, price, counts, category_id } = req.body;
      const images = req.files.map(file => file.filename);
      
  
      await Dashboard.createproduct(product_name, product_detail, images, price, counts, category_id);
  
      res.status(201).json({ success: true, message: 'Product added successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'Product added failed' });
  }
};

const allproducts = async (req, res, next) => {

  try {
    const product = await Dashboard.allproducts();

    const modifiedResponse = {
      product: product.map(item => {
        return {
          id: item.id,
          name: item.product_name,
          details: item.product_detail,
          category: item.category,
          images: JSON.parse(item.image), 
          price: item.price,
          counts: item.counts
        };
      })
    };
    res.status(200).json(modifiedResponse); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting products' });
    }
  };


  const productdetail = async (req, res, next) => {
    const productId = req.params.id;
    try {

    
      
      const product = await Dashboard.productdetail(productId);
  
      const modifiedResponse = {
        success: true,
        product: product.map(item => {
          return {
            id: item.id,
            name: item.product_name,
            details: item.product_detail,
            category: item.category,
            images: JSON.parse(item.image), 
            price: item.price,
            counts: item.counts
          };
        })
      };
      res.status(200).json(modifiedResponse); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting product' });
    }
  };




  const updateproduct = async (req, res, next) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        
        try {
          const { product_name, product_detail, price, counts, category_id } = req.body;
          const images = req.files.map(file => file.filename);
          const productId = req.params.id;
          
          await Dashboard.updateproduct(productId, product_name, product_detail, images, price, counts, category_id);
          
          res.status(200).json({ success: true, message: 'Product updated successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, error: 'Error updating product' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Product update failed' });
    }
  };
  

  const deleteproduct = async(req,res,next) =>{
    try{
      const{is_deleted} = req.body;
      const productId = req.params.id;
      await Dashboard.deleteproduct(productId,is_deleted);
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch(err){
      console.error(err);
      res.status(400).json({ success: false, error: 'Product deleted failed' });
    }
  }

  module.exports = {
    createproduct,
    productdetail,
    updateproduct,
    deleteproduct,
    allproducts
  };