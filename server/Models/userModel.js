const db = require('../config');

async function addUser(username, email, hashPassword){
    try{
        const query = `insert into users (username, email, password) 
                        values ($1, $2, $3)
                        RETURNING id`;
        const values = [username, email, hashPassword];
        const addUser = await db.query(query, values);
        return addUser.rows[0];
    }catch(error){
        return error;
    }
}

async function login(email){
    try{
        const query = `select * from users where email = $1`;
        const user = await db.query(query, [email]);
        if ( user.rows[0] != null){
            return user.rows[0];
        } else {
            return "email is not found";
        }
    } catch(error){
        return error;
    }
};

module.exports = {
    addUser,
    login
};