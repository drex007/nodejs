const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body; // Get params from body

    const findUser = usersDB.users.find(person => person.username === user); // if the user exist
    if (!findUser) return res.sendStatus(401).json({ "message": "User not found" }) // Unauthorized

    //Check if the user password is correct
    const matchPassword = await bcrypt.compare(pwd, findUser.password);
    if (matchPassword) {
        // Create JWT
        const accessToken = jwt.sign( // The jwt.sign() method takes in two arguments the username and  the secret you will like to encode with
            { "username": findUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": findUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //Saving refresh token with current User
        const otherUsers = usersDB.users.filter(person => person.username !== findUser.username);
        const currentUser = { ...findUser, refreshToken }
        console.log(currentUser);

        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({accessToken})
    } else {
        res.status(401).json({ "message": "Your password is incorrect" });
    }
}

module.exports = { handleLogin }