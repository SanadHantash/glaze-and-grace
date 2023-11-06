const db = require('../config');
const Shopping = {};




Shopping.addtocart = async (productId, user_id, count, total_Price) => {
    try {
        const totalPriceQuery = await db.query(
            `
            SELECT REPLACE(p.price, '$', '')::numeric * $2::numeric AS total_price
            FROM products p
            WHERE p.id = $1
            LIMIT 1
            `,
            [productId, count]
        );

        if (!totalPriceQuery || !totalPriceQuery.rows || totalPriceQuery.rows.length === 0) {
            throw new Error('Failed to calculate total_price');
        }

        const total_price = totalPriceQuery.rows[0].total_price;

        const result = await db.query(
            `
            INSERT INTO shopping_cart (product_id, user_id, count, total_price)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,
            [productId, user_id, count, total_price]
        );
            
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to insert into shopping_cart');
        }

        return result.rows[0]; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

Shopping.updateproduct = async (productId,userID, count) => {
    try {
   
        const numericCount = parseFloat(count);


        if (isNaN(numericCount) || numericCount <= 0) {
            throw new Error('Invalid count value');
        }

        const result = await db.query(
            `
            WITH calculated_price AS (
                SELECT REPLACE(p.price, '$', '')::numeric * $1::numeric AS total_price
                FROM products p
                WHERE p.id = $2
            )
            UPDATE shopping_cart
            SET count = $1, total_price = (SELECT total_price FROM calculated_price)
            WHERE product_id = $2 and user_id =$3
            RETURNING *;
            `,
            [numericCount, productId , userID]
        );

        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to update shopping_cart');
        }

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};



Shopping.getcartproducts = async (userID) => {
    try {
        const result = await db.query('SELECT shopping_cart.id, products.product_name, shopping_cart.count, shopping_cart.total_price, products.image, categories.category FROM shopping_cart INNER JOIN products ON products.id = shopping_cart.product_id  INNER JOIN categories ON categories.id = products.category_id WHERE shopping_cart.user_id = $1 AND shopping_cart.is_deleted = false;',[userID]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

  Shopping.deleteproduct = async (productId) => {
        try {

          const result = await db.query('delete  from shopping_cart  WHERE product_id = $1', [productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
    };

    Shopping.totalprice = async (userID) => {
        try {
            const result = await db.query('SELECT SUM(shopping_cart.total_price) as sum, users.username FROM shopping_cart INNER JOIN users ON users.id = shopping_cart.user_id WHERE shopping_cart.user_id = $1  GROUP BY users.id, users.username;', [userID]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

     Shopping.checkconfirm = async (userID) => {
        try {
         
          const result = await db.query('UPDATE shopping_cart SET is_deleted = TRUE  WHERE user_id = $1', [userID]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };


module.exports = Shopping;