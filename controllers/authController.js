const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt');

const handleLogin = (req, res) => {
    const { user, pwd } = req.body; // Get params from body

    const findUser = usersDB.users.find(person => person.username === user); // if the user exist
    if (!findUser) return res.sendStatus(401).json({"message": "User not found"}) // Unauthorized

    //Check if the user password is correct
    const matchPassword = bcrypt.compare(pwd, findUser.password);
    if (matchPassword) {  
        res.status(200).json({ "message": "You have successfully logged in", "Jwt": "", "User": findUser.username })
    } else {
        res.status(401).json({"message": "Your password is incorrect"});
    }
}

module.exports = {handleLogin}