const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = regex.test(email);
    if (!isValid) {
        return 'Invalid email address';
    }
    return true;
};

const validatePassword = (password) => {
    // 8-20 letter password with at least one uppercase letter, one lowercase letter and one number.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    const isValid = regex.test(password);
    if (!isValid) {
        return 'Should be 8-20 characters and contain at least one number and one uppercase letter';
    }
    return true;
};

const validateName = (name) => {
    const regex = /^(?=.{3,20}$)[a-zA-Z\s]*$/;
    const isValid = regex.test(name);
    if (!isValid) {
        return 'Should be 3-20 letters and contain no special characters';
    }
    return true;
};

export { validateEmail, validatePassword, validateName };
