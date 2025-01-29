import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../helpers/constants/textConstants/labelsAndHeadings.js";


const SearchBox = ({route, placeholder, label}) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const searchLabel = LABELS.COMMON.SEARCH + " " + label;

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim()) {
            navigate(`${route}?query=${query}`);
        }
    };

    return (
        <form className={"form-group mb-3 sms-section--light variant variant--primary bg-light"} onSubmit={handleSearch}>
            <label className={"form-label sr-only"} htmlFor={label}>{label}</label>
            <div className="input-group">

                <input
                    name={label}
                    type="text"
                    className="form-control border-0 p-3 fs-3"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary px-4" aria-label={searchLabel}>
                    <FontAwesomeIcon icon={faSearch} className={"me-0 me-md-3 fs-2"}/>
                    <span className={"fs-4 d-none d-md-inline"}>{searchLabel}</span>
                </button>
            </div>
        </form>
    );
};

export default SearchBox;