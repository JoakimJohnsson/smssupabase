import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {TwButtonPrimary} from "./tw-components/buttons";
import {MESSAGES} from "../helpers/constants";
import {validateEmail, validatePassword} from "../helpers/validations";

const Signup = () => {

    // Success and error variants of form-input is available
    const [emailInputClass, setEmailInputClass] = useState("form-input-default");
    const [passwordInputClass, setPasswordInputClass] = useState("form-input-default");
    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidationMessage, setEmailValidationMessage] = useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

    const emailRef = useRef()
    const passwordRef = useRef()
    const {signUp} = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const {error} = await signUp({email, password});

        if (error) {
            setFormErrorMessage(MESSAGES.ERROR.signupFormValidation);
            setShowFormError(true);
        } else {
            history.push('/')
        }
    }

    const handleEmailValidation = (e) => {
        validateEmail(e) ? handleEmailSuccess() : handleEmailError();
    }

    const handlePasswordValidation = (e) => {
        validatePassword(e) ? handlePasswordSuccess() : handlePasswordError();
    }

    const handleEmailSuccess = () => {
        setEmailInputClass("form-input-success");
        setEmailValidationMessage(MESSAGES.SUCCESS.emailValidation);
    }

    const handleEmailError = () => {
        setEmailInputClass("form-input-error");
        setEmailValidationMessage(MESSAGES.ERROR.emailValidation);
    }
    const handlePasswordSuccess = () => {
        setPasswordInputClass("form-input-success");
        setPasswordValidationMessage(MESSAGES.SUCCESS.passwordValidation);
    }

    const handlePasswordError = () => {
        setPasswordInputClass("form-input-error");
        setPasswordValidationMessage(MESSAGES.ERROR.passwordValidation);
    }

    return (
        <>
            <h2 className={"font-bold mb-3"}>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label className={"form-label"} htmlFor="input-email">Email</label>

                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={"name@myplace.se"}
                       required/>
                <p className={"mb-3 mt-2 text-gray-500"}>{emailValidationMessage !== "" ? emailValidationMessage : false}</p>

                <label className={"form-label"} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <p className={"mb-3 mt-2 text-gray-500"}>{passwordValidationMessage !== "" ? passwordValidationMessage : false}</p>
                <TwButtonPrimary type="submit" label={"Sign up"} className={"block"}/>
                {showFormError ?
                    <p className={"mb-3 mt-2 bg-red-50 border border-red-700 text-red-900"}>{formErrorMessage}</p>
                    :
                    false
                }
            </form>
        </>
    )
}

export default Signup;
