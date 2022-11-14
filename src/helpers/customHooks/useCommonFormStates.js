import {useState} from "react";
import {CLASSES} from "../constants";


export const useCommonFormStates = () => {

    const [name, setName] = useState("");
    const [formMessage, setFormMessage] = useState({show: false, error: false, message: ""});
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);

    return [
        name, setName,
        formMessage, setFormMessage,
        nameValidated, setNameValidated,
        formInputClass, setFormInputClass
    ];
}
