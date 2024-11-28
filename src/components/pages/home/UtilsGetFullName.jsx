export const UtilsGetFullName = () => {

    const getFullName = `protected String getFullName(String familyName, String givenName) {
    if (!StringUtil.isEmpty(familyName) && !StringUtil.isEmpty(givenName)) {
        return givenName + " " + familyName;
    } else if (!StringUtil.isEmpty(familyName)) {
        return familyName;
    } else if (!StringUtil.isEmpty(givenName)) {
        return givenName;
    }
    return null;
}`;


    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get full name</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFullName}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{}</code></pre>
        </div>
    )
}
