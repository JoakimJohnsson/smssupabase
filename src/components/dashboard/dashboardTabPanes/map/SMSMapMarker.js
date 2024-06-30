import React from "react";
import {AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import {MAP_CONFIG} from "../../../../helpers/constants/configConstants";


export const SMSMapMarker = ({position, isDestination = false}) => {

    const background = isDestination ? MAP_CONFIG.COLORS.PIN_BACKGROUND_VARIANT : MAP_CONFIG.COLORS.PIN_BACKGROUND;
    const borderColor = MAP_CONFIG.COLORS.PIN_BORDER;
    const glyphColor = isDestination ? MAP_CONFIG.COLORS.PIN_GLYPH_VARIANT : MAP_CONFIG.COLORS.PIN_GLYPH;

    return position && (
        <AdvancedMarker position={position}>
            <Pin
                background={background}
                borderColor={borderColor}
                glyphColor={glyphColor}
                scale={1.2}
            />
        </AdvancedMarker>
    )
}
