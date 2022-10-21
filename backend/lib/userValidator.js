const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const isValidPassword = (password) => {
    // 8-20 letter password with at least one uppercase letter, one lowercase letter and one number.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    return regex.test(password);
};

const isValidName = (name) => {
    const regex = /^(?=.{3,20}$)[a-zA-Z\s]*$/;
    return regex.test(name);
};

module.exports = { isValidEmail, isValidPassword, isValidName };
