import {useState} from "react";
import {CLASSES} from "../constants";


export const useCommonFormStates = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [wiki_url, setWiki_url] = useState("");
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);

    return {
        name,
        setName,
        description,
        setDescription,
        wiki_url,
        setWiki_url,
        formInputClass,
        setFormInputClass
    };
}
