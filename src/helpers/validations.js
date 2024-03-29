import validator from 'validator';

export const simpleInputValidation = (e, setValidation) => {
    e.target.value !== '' ? setValidation(true) : setValidation(false);
}

export const validateEmail = (e) => {
    const email = e.target.value + '';
    return validator.isEmail(email);
}

export const validatePassword = (e) => {
    const password = e.target.value + '';
    return validator.isStrongPassword(password, {minLength: 10, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0, returnScore: false});
}
