import React from "react";


export const Logger = ({log, key, stringify}) => {
    if (stringify) {
        return (
            <div className={"p-2 bg-light text-black-50 mb-2"}>
                <pre>{JSON.stringify(log, null, 2)}</pre>
            </div>
        )
    } else {
        console.log("LOG " + key + ": ", log);
    }
}
