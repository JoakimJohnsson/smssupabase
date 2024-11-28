export const UtilsGetFullTitle = () => {

    const getFullTitleJava = `public String getFullTitle() {
    String fullTitle = title;
    if (subTitle != null && !subTitle.isEmpty()) {
        fullTitle = title + ": " + subTitle;
    }
    return fullTitle;
}`;

    const getFullTitleJS = `const getFullTitle = (title, subTitle) => {
    let fullTitle = title;
    if (subTitle && subTitle.trim() !== "") {
        fullTitle = title + ": " + subTitle;
    }
    return fullTitle;
}`;

    const title = "Det perfekta javascriptet";
    const subTitle = "En sällsam historia";

    const getFullTitle = (title, subTitle) => {
        let fullTitle = title;
        if (subTitle && subTitle.trim() !== "") {
            fullTitle = title + ": " + subTitle;
        }
        return fullTitle;
    }


    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get full title</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFullTitleJava}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{getFullTitleJS}</code></pre>
            <p>title: Det perfekta javascriptet</p>
            <p>subTitle: En sällsam historia</p>
            <p className={"alert alert-success"}>Output: {getFullTitle(title, subTitle)}</p>
        </div>
    )
}
