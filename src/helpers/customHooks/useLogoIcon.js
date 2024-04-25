import {useState, useEffect} from "react";
import {getLogoIcon} from "../functions";


export const useLogoIcon = () => {

    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIcon(getLogoIcon());
        // Cleanup logic to handle component unmounting and avoid potential memory leaks or state update issues on unmounted components.
        return () => {
            setIcon(null);
        };
    }, []);

    return {
        icon
    };
}
