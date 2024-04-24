import {useState, useEffect} from "react";
import {getLogoIcon} from "../functions";


export const useLogoIcon = () => {

    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIcon(getLogoIcon());
    }, []);

    return {
        icon
    };
}
