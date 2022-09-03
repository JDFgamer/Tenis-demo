const bcrypt = require('bcrypt');

const encriptedPassword = async (password) => {
    const base = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, base)
    return newPassword
}

const authPassword = (password, userPass) => {
    return bcrypt.compare(password, userPass);
}


module.exports = {
    encriptedPassword,
    authPassword
}