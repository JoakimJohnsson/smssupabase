export const UtilsGetFullTitle = () => {

    const getFullTitle = `public String getFullTitle() {
    String fullTitle = title;
    if (subTitle != null && !subTitle.isEmpty()) {
        fullTitle = title + ": " + subTitle;
    }
    return fullTitle;
}`;


    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get full title</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFullTitle}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{}</code></pre>
        </div>
    )
}
