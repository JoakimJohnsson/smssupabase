import React from "react";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export const DraftRenderer = ({ text }) => {
    if (!text) return null; // If there's no text, return nothing

    let htmlContent = "";
    try {
        const contentState = convertFromRaw(JSON.parse(text));
        htmlContent = stateToHTML(contentState);
    } catch (error) {
        console.error("Error parsing Draft.js content:", error);
        return <p>Error loading content</p>;
    }
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
