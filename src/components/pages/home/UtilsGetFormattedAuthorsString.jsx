export const UtilsGetFormattedAuthorsString = () => {

    const getFormattedAuthorsString = `public String getFormattedAuthorsString() {
    String allAuthors = "";
    if (getFirstAuthor() == null || "".equals(getFirstAuthor())) {
        return allAuthors;
    } else {
        allAuthors += getFirstAuthor();
        if (hasMoreAuthors) {
            allAuthors += " (et al.)";
            return allAuthors;
        }
        if (getSecondAuthor() != null && !"".equals(getSecondAuthor())) {
            allAuthors += ", " + getSecondAuthor();
        }
        if (getThirdAuthor() != null && !"".equals(getThirdAuthor())) {
            allAuthors += ", " + getThirdAuthor();
        }
    }
    return allAuthors;
}`;

    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get formatted authors string</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFormattedAuthorsString}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{}</code></pre>
        </div>
    )
}
