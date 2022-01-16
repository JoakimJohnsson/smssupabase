import {supabase} from '../supabase/supabaseClient';
import {CLASSES, MESSAGES} from './constants';

export async function checkIfEmailExists(emailReference, setEmailExists) {
    let {data: email} = await supabase.from('users').select('email').eq('email', emailReference)
    if (email.length > 0) {
        setEmailExists(true);
    } else {
        setEmailExists(false);
    }
}

export const prepareUrl = (url) => {
    if (url && url.substring(0, 7) !== 'http://') {
        return 'https://' + url;
    } else {
        return url;
    }
}

export const handleEmailInput = (success, setEmailInputClass, setEmailValidated, setEmailValidationMessage) => {
    if (success) {
        setEmailInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setEmailValidated(true);
        setEmailValidationMessage(MESSAGES.SUCCESS.VALIDATION_EMAIL);
    } else {
        setEmailInputClass(CLASSES.FORM_INPUT_ERROR);
        setEmailValidated(false);
        setEmailValidationMessage(MESSAGES.ERROR.VALIDATION_EMAIL);
    }
}

export const handlePasswordInput = (success, setPasswordInputClass, setPasswordValidated, setPasswordValidationMessage) => {
    if (success) {
        setPasswordInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setPasswordValidated(true);
        setPasswordValidationMessage(MESSAGES.SUCCESS.VALIDATION_PASSWORD);
    } else {
        setPasswordInputClass(CLASSES.FORM_INPUT_ERROR);
        setPasswordValidated(false)
        setPasswordValidationMessage(MESSAGES.ERROR.VALIDATION_PASSWORD);
    }
}

// API functions

export async function getRole(user, setRole) {
    if (user) {
        try {
            let {data, error, status} = await supabase
                .from('profiles')
                .select(`role`)
                .eq('id', user.id)
                .single();
            if (error && status !== 406) {
                console.log('Error: ', error);
            }
            if (data) {
                setRole(data.role);
            }
        } catch (error) {
            alert(error.message)
        }
    }
}