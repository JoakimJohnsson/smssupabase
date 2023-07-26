export const clearInput = (setSearchParams, useFormat = false) => {
    if (useFormat) {
        setSearchParams({filterQuery: "", filterFormat: ""});
    } else {
        setSearchParams({filterQuery: ""});
    }
}
