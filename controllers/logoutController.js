const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.user = data }
}

const fsPromises = require('fs').promises
const path = require('path')


const handleLogout = async (req, res) => {
    const cookies = req.cookies; // Get params from body
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const findUser = usersDB.users.find(person => person.username === user); // if the user exist
    if (!findUser) {
        res.clearCookie('jwt', { httpOnly: true });

        return res.sendStatus(403)
    } // Forbidden

    const otherUsers = usersDB.users.filter(person => person.refreshToken !== findUser.refreshToken);
    const currentUser = { ...findUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true });
}

module.exports = { handleLogout }