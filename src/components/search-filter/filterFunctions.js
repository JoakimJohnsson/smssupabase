export const clearInput = (setSearchParams, searchParams) => {
    setSearchParams({filter: "", sort: searchParams.get("sort")})
}
