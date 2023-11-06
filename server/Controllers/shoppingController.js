const Shopping = require('../Models/shoppingModel.js');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const addtocart = async (req, res) => {
  try {
      const {count} = req.body;
      const productId = req.params.id;
      const userID = req.user.id;
    

      await Shopping.addtocart(productId, userID, count);

      res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Product added failed' });
  }
};


const getcartproducts = async (req, res, next) => {

    try {
      const userID = req.user.id;
      const shoppingcart = await Shopping.getcartproducts(userID);

      const modifiedResponse = {
        // success: true,
        shoppingcart: shoppingcart.map(item => {
          return {
            id: item.id,
            name: item.product_name,
            details: item.product_detail,
            category: item.category,
            images: JSON.parse(item.image), 
            price: item.total_price,
            counts: item.count
          };
        })
      };
      res.status(200).json(modifiedResponse); 
      res.status(200).json(shoppingcart);
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting shoppingcarts' });
      }
    };

    const deleteproduct = async (req, res) => {
      try {
          const productId = req.params.id;
          const userID = req.user.id;

  
        await Shopping.deleteproduct(productId,userID);
  
  
          res.status(200).json({ success: true, message: 'Product deleted successfully'});
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, error: 'Internal server error' });
      }
  };


  const updateproduct = async (req, res) => {
    try {
        const { count } = req.body;
        const productId = req.params.id;
        const userID = req.user.id;

     
        const updatedProduct = await Shopping.updateproduct(productId,userID, count);

   
        res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  const totalprice = async (req, res) => {
    try {
      const userID = req.user.id;
      const total =  await Shopping.totalprice(userID);

        res.status(200).json({ success: true, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


const createCheckoutSession = async (req, res) => {
  try {
    const userID = req.user.id;
    const cartProducts = await Shopping.getcartproducts(userID); 
    const totalPriceResult = await Shopping.totalprice(userID); 
  

    const totalAmount = totalPriceResult[0].sum;
    

    const lineItems = cartProducts.map(product => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.product_name,
          },
          unit_amount: Math.round(product.total_price * 100), 
        },
        quantity: product.count,
      };
    });

  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
    await Shopping.checkconfirm(userID); 
    console.log(totalAmount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'payment failed' });
  }
};

    module.exports = {
        addtocart,
        getcartproducts,
        deleteproduct,
        totalprice,
        updateproduct,
        createCheckoutSession
      };