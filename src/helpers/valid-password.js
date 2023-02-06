const validPassword = (pwd) => {
    if (!pwd || pwd.length < 6 || pwd.length > 20) {
        return false;
    }
    return true;
};

module.exports = validPassword;
