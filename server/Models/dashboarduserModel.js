const db = require('../config');


async function Users() {
    try{
    const result = await db.query('SELECT * FROM users');
            return result.rows;
    }
    catch (error) {
        throw error;
  }
}


async function deleteUser(id, newData) {
    try{
        if (newData.is_deleted === true) {
                        // Perform a soft delete when is_deleted is true
        await db.query('UPDATE users SET is_deleted=true WHERE id=$1', [id]);
        
        }else{
        await db.query('UPDATE users SET is_deleted=false WHERE id=$1', [id]);
        }
        return { message: 'User updated successfully' };
    }
    
    catch (error) {
        throw error;
  }
}




module.exports = {
    Users,
    deleteUser
};