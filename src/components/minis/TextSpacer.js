import React from "react";

export const TextSpacer = ({character, margin}) => {
    return (
        <span className={`fw-bold text-black--lighter ${margin}`}>{character}</span>
    )
}
