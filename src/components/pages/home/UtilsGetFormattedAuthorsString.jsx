export const UtilsGetFormattedAuthorsString = () => {

    const getFormattedAuthorsStringJava = `public String getFormattedAuthorsString() {
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

    const getFormattedAuthorsStringJS = `function getFormattedAuthorsString(firstAuthor, secondAuthor, thirdAuthor, hasMoreAuthors) {
    let allAuthors = "";
    
    if (!firstAuthor || firstAuthor.trim() === "") {
        return allAuthors;
    } else {
        allAuthors += firstAuthor;
        if (hasMoreAuthors) {
            allAuthors += " (et al.)";
            return allAuthors;
        }
        if (secondAuthor && secondAuthor.trim() !== "") {
            allAuthors += ", " + secondAuthor;
        }
        if (thirdAuthor && thirdAuthor.trim() !== "") {
            allAuthors += ", " + thirdAuthor;
        }
    }
    return allAuthors;
}`;

    const firstAuthor = "Joakim Johnsson";
    const secondAuthor = "Tomas Tomasson";
    const thirdAuthor = "Hektor Bladh";
    // Is true if there are more than 3 authors
    const hasMoreAuthors1 = false;
    const hasMoreAuthors2 = true;

    const getFormattedAuthorsString = (firstAuthor, secondAuthor, thirdAuthor, hasMoreAuthors) => {
        let allAuthors = "";

        if (!firstAuthor || firstAuthor.trim() === "") {
            return allAuthors;
        } else {
            allAuthors += firstAuthor;
            if (hasMoreAuthors) {
                allAuthors += " (et al.)";
                return allAuthors;
            }
            if (secondAuthor && secondAuthor.trim() !== "") {
                allAuthors += ", " + secondAuthor;
            }
            if (thirdAuthor && thirdAuthor.trim() !== "") {
                allAuthors += ", " + thirdAuthor;
            }
        }
        return allAuthors;
    }

    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get formatted authors string</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFormattedAuthorsStringJava}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{getFormattedAuthorsStringJS}</code></pre>
            <p>firstAuthor: Joakim Johnsson</p>
            <p>secondAuthor: Tomas Tomasson</p>
            <p>thirdAuthor: Hektor Bladh</p>
            <p>hasMoreAuthors: false</p>
            <p className={"alert alert-success"}>Output: {getFormattedAuthorsString(firstAuthor, secondAuthor, thirdAuthor, hasMoreAuthors1)}</p>
            <p>firstAuthor: Joakim Johnsson</p>
            <p>secondAuthor: Tomas Tomasson</p>
            <p>thirdAuthor: Hektor Bladh</p>
            <p>hasMoreAuthors: true</p>
            <p className={"alert alert-success"}>Output: {getFormattedAuthorsString(firstAuthor, secondAuthor, thirdAuthor, hasMoreAuthors2)}</p>
        </div>
    )
}
