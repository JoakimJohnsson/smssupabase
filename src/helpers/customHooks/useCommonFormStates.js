import {useState} from "react";
import {CLASSES} from "../constants";


export const useCommonFormStates = () => {

    const [name, setName] = useState('');
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [disableReset, setDisableReset] = useState(false);

    return [
        name, setName,
        showFormError, setShowFormError,
        showFormSuccess, setShowFormSuccess,
        formMessage, setFormMessage,
        nameValidated, setNameValidated,
        formInputClass, setFormInputClass,
        uploading, setUploading,
        imageFilename, setImageFilename,
        imageUrl, setImageUrl,
        disableReset, setDisableReset
    ];

}