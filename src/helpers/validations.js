import validator from 'validator';

export const simpleInputValidation = (e, setValidation) => {
    setValidation(e.target.value !== undefined && e.target.value !== null && e.target.value !== "");
}

export const validateEmail = (e) => {
    const email = e.target.value + "";
    return validator.isEmail(email);
}

export const validatePassword = (e) => {
    const password = e.target.value + "";
    return validator.isStrongPassword(password, {minLength: 10, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0, returnScore: false});
}
