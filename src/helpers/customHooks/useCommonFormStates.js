import {useState} from "react";
import {CLASSES} from "../constants";


export const useCommonFormStates = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [formMessage, setFormMessage] = useState({show: false, error: false, message: ""});
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);

    return [
        name, setName,
        description, setDescription,
        formMessage, setFormMessage,
        formInputClass, setFormInputClass
    ];
}
