import React from 'react';


export const LazyTextPlaceholder = ({charCount}) => {

    let placeholder = "";
    for (let i = 0; i < charCount; i++) {
        placeholder += "X";
    }
    return (
        <p className={"placeholder-glow d-inline"}><span className="placeholder">{placeholder}</span></p>
    )
};


