const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt')


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password is required" })

    //Check for duplicate
    const duplicate = usersDB.users.find(person => person.usernmae === user);
    if (duplicate) return res.sendStatus(409); // Statusciode for conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { "username": user, "password": hashedPwd }

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), // Specify the file dir you want to write to
            JSON.stringify(usersDB.users) //Content you are writing 
        );
        console.log(usersDB.users);
        res.status(201).json({"success": "New user has been created"})


    } catch (err) {
        res.status(500).json({ "message": err.message })
    }


}


module.exports = {handleNewUser}