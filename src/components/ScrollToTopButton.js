import React, {useCallback, useEffect, useState} from "react";
import {faArrowUp} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LABELS_AND_HEADINGS} from "../helpers/constants";


const ScrollToTopButton = () => {

    // TODO - dölj när man scrollar upp - samt på mobil - gör lite transparent

    const [showScrollButton, setShowScrollButton] = useState(false);

    const config = {
        scrolledLimit: 400,
        behavior: "smooth"
    }

    const toggleShow = useCallback(() => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > config.scrolledLimit){
            setShowScrollButton(true)
        }
        else if (scrolled <= config.scrolledLimit){
            setShowScrollButton(false)
        }
    }, [config.scrolledLimit])

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: config.behavior
        });
    };

    // Add listener for scroll event when component renders
    useEffect(() => {
        window.addEventListener("scroll", toggleShow);
        // Cleanup component
        return () => {
            window.removeEventListener("scroll", toggleShow);
        };
    }, [toggleShow])

    return showScrollButton && (
        <button className={"sms-link-to-top-button d-none d-lg-block"} aria-label={LABELS_AND_HEADINGS.BACK_TO_TOP} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} className={"fa-2x"}/>
        </button>
    )
};

export default ScrollToTopButton;