const db = require('../config');

async function getInfornation(id){
    try{
        const query = `select username, email from users where id = $1`;
        const User = await db.query(query, [id]);
        return User.rows[0];
    }catch(error){
        res.status(500).json(error);
    }
};

async function getWishlist(id){
    try{
        const query = `select * from wishlist where user_id = $1`;
        const wishlist = await db.query(query, [id]);
        return wishlist.rows;
    }catch(error){
        res.status(500).json(error);
    }
};

async function getHistory(id){
    try{
        const query = `select * from history where user_id = $1`;
        const history = await db.query(query, [id]);
        return history.rows;
    }catch(error){
        res.status(500).json(error);
    }
};

async function deleteFromWishlist(id, product_id){
    try{
        const query = `DELETE FROM wishlist
        WHERE user_id = $1 AND product_id = $2;`;
        const history = await db.query(query, [id, product_id]);
    }catch(error){
        res.status(500).json(error);
    }
};

async function editInfo(id, username, email){
    try{
        const query = `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING username, email`;
        const newdata = await db.query(query, [username, email, id]);
        return newdata.rows[0];
    }catch(error){
        if (error.code == 23505){
            return "the is email already exists.";
        }else {
            return error;
        }
    }
};

module.exports = {
    getInfornation,
    getWishlist,
    getHistory,
    deleteFromWishlist,
    editInfo
};