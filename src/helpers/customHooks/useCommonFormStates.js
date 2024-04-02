import {useState} from "react";


export const useCommonFormStates = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [wiki_url, setWiki_url] = useState("");
    const [formInputClass, setFormInputClass] = useState("form-input--default");

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
