const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies; // Get params from body
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const findUser = usersDB.users.find(person => person.username === user); // if the user exist
    if (!findUser) return res.sendStatus(403) // Forbidden

    //Check if the user password is correct

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            const accessToken = jwt.sign(
                { "username": findUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

        }
    )

}

module.exports = { handleRefreshToken }