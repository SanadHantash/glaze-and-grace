const db = require('../config');


   async function products(id) {
        try {
            const query = `select * from products where category_id = $1 `;
            const value = id;
            const result = await db.query(query, [value]); 
            return result.rows;
            
        } catch (error) {
            // return error.message;
            console.log(error)
        }
      }


      async function newproduct() {
        try {
            
            const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
            return result.rows;
            
        } catch (error) {
            throw error;
            // return error.message;
            // console.error(error);
            // res.status(500).send('Internal Server Error');
            
        }
      }


      async function discountproduct() {
        try {
            
            const result = await db.query('select * from products where discount = true');
            return result.rows;
            
        } catch (error) {
            throw error;
            // return error.message;
            // console.error(error);
            // res.status(500).send('Internal Server Error');
            
        }
      }


      async function topproduct() {
        try {
            
            const result = await db.query('select * from products INNER JOIN rating on rating.product_id = products.id where rate = 5');
            return result.rows;
            
        } catch (error) {
            throw error;
            // return error.message;
            // console.error(error);
            // res.status(500).send('Internal Server Error');
            
        }
      }


module.exports = {
    products,
    newproduct,
    discountproduct,
    topproduct
};