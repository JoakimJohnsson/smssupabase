import {useEffect, useState} from "react";
import {CONFIG} from "../constants/configConstants";
import {getAllIssuesWithTitleAndPublisher} from "../../services/issueService";
import {filterQueryIssueByTitleNamePublisherNameYearAndSource, sortByName} from "../functions";
import {useSimpleQueryFilter} from "./useSimpleQueryFilter";


export const useShowMoreFilteredData = () => {

    const [issuesData, setIssuesData] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(CONFIG.PAGINATION_ITEM_COUNT);
    const [loading, setLoading] = useState(true);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getAllIssuesWithTitleAndPublisher(setIssuesData).then(() => setLoading(false));
    }, []);

    const filteredData = issuesData
        .sort((a, b) => sortByName(a.titles, b.titles))
        .filter(issue => {
                return (
                    filterQueryIssueByTitleNamePublisherNameYearAndSource(issue, query)
                )
            }
        );

    return {
        filteredData,
        itemsToShow,
        setItemsToShow,
        loading,
        query,
        setSearchParams
    }
}
