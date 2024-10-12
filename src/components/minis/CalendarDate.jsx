import React from "react";


export const CalendarDate = ({dateString}) => {

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'numeric' });
    const year = date.getFullYear();

    return (
        <div className={"calendar-date border bg-elephant p-2"}>
            <span className="d-block h6 mb-0 text-nowrap">{day} / {month}</span>
            <span className="d-block h4 mb-0">{year}</span>
        </div>
    )
}
