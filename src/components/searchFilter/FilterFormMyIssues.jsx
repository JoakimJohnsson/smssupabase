import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faDeleteLeft} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import FilterButtonGrade from "./FilterButtonGrade.jsx";
import {GRADE_VARIANTS} from "../../helpers/constants/configConstants.jsx";
import {initializeFilterGrades} from "../../helpers/functions.jsx";


const FilterFormMyIssues = ({
                                setSearchParams,
                                query,
                                placeholder,
                                setSelectedGrades
                            }) => {

    const [filterQuery, setFilterQuery] = useState(query || "");
    const [readyForSearch, setReadyForSearch] = useState(false);
    const [filterGrades, setFilterGrades] = useState(initializeFilterGrades);

    useEffect(() => {
        const selected = Object.keys(filterGrades).filter(key => filterGrades[key]);
        setSelectedGrades(selected);
    }, [filterGrades, setSelectedGrades]);

    const updateSearchParams = () => {
        setSearchParams({
            query: filterQuery,
            ...filterGrades
        });
        setReadyForSearch(false);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            updateSearchParams();
        }
    };

    const handleChange = (e) => {
        setReadyForSearch(true);
        setFilterQuery(e.target.value);
    };

    const handleReset = () => {
        setReadyForSearch(true);
        setFilterQuery("");
        setFilterGrades(initializeFilterGrades());
    };

    const toggleGrade = (key) => {
        setFilterGrades(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
        setReadyForSearch(true);
    };

    return (
        <div className={"col-12 form-group mb-4 bg-horse p-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS.COMMON.DO_FILTER}</label>
                <div className="input-group mb-3 col-8">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={filterQuery}
                           onKeyDown={handleEnter}
                           onChange={handleChange}
                    />
                    {
                        filterQuery !== "" &&
                        <button className="btn btn-primary" onClick={updateSearchParams}>
                            <FontAwesomeIcon icon={faSearch} className={"me-2"}/>
                            {LABELS.COMMON.SEARCH}
                        </button>
                    }
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className={"input-group"}>
                    {
                        Object.keys(GRADE_VARIANTS)
                            .sort((a, b) => GRADE_VARIANTS[a].id - GRADE_VARIANTS[b].id)
                            .map((key, index) => (
                                <FilterButtonGrade grade={GRADE_VARIANTS[key]} state={filterGrades[key]}
                                                   setState={() => toggleGrade(key)}
                                                   setReadyForSearch={setReadyForSearch} key={index}/>
                            ))
                    }
                </div>
            </div>
            <button className="btn btn-lg btn-primary mb-3 me-3" onClick={updateSearchParams}
                    disabled={!readyForSearch}>
                <FontAwesomeIcon icon={faSearch} className={"me-2"}/>
                {LABELS.COMMON.FIND_ISSUES}
            </button>
            <button className="btn btn-lg btn-outline-primary mb-3" onClick={handleReset}>
                <FontAwesomeIcon icon={faDeleteLeft} className={"me-2"}/>
                {LABELS.COMMON.RESET_FILTER}
            </button>
        </div>
    );
};

export default FilterFormMyIssues;