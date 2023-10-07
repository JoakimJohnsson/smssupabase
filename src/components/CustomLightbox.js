import React from "react";
import Lightbox from "yet-another-react-lightbox";


const CustomLightbox = ({slides, openLightbox, setOpenLightbox}) => {

    return (
        <Lightbox
            open={openLightbox}
            close={() => setOpenLightbox(false)}
            slides={slides}
            render={{
                buttonPrev: slides.length <= 1 ? () => null : undefined,
                buttonNext: slides.length <= 1 ? () => null : undefined
            }}
            carousel={{
                finite: slides.length <= 1
            }}
            controller={{
                closeOnBackdropClick: true
            }}
        />
    )
}

export default CustomLightbox;
