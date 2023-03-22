import {useState, useEffect} from "react";
import {checkIfIsCollectingTitle} from "../functions/serviceFunctions/collectFunctions";


export const useIsCollectingTitle = (userId, titleId) => {

    const [isCollectingTitle, setIsCollectingTitle] = useState(false);

    useEffect(() => {
        if (userId && titleId) {
            checkIfIsCollectingTitle(userId, titleId, setIsCollectingTitle).then();
        }
    }, [userId, titleId])

        return [
            isCollectingTitle,
            setIsCollectingTitle
        ];
}
