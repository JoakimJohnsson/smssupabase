export const clearInput = (setSearchParams, useFormatFilter = false) => {
    if (useFormatFilter) {
        setSearchParams({filterQuery: "", filterFormat: ""});
    } else {
        setSearchParams({filterQuery: ""});
    }
}
