import React from 'react';


export const LazyTextPlaceholder = ({charCount}) => {

    let placeholder = "";
    for (let i = 0; i < charCount; i++) {
        placeholder += "X";
    }
    return (
        <span className="placeholder">{placeholder}</span>
    )
};


