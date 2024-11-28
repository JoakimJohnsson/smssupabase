export const UtilsGetFullName = () => {

    const getFullNameJava = `protected String getFullName(String familyName, String givenName) {
    if (!StringUtil.isEmpty(familyName) && !StringUtil.isEmpty(givenName)) {
        return givenName + " " + familyName;
    } else if (!StringUtil.isEmpty(familyName)) {
        return familyName;
    } else if (!StringUtil.isEmpty(givenName)) {
        return givenName;
    }
    return null;
}`;

    const getFullNameJS = `const getFullName = (givenName, familyName) => {
    if (givenName && givenName.trim() !== "" && familyName && familyName.trim() !== "") {
        return givenName + " " + familyName;
    } else if (familyName && familyName.trim() !== "") {
        return familyName;
    } else if (givenName && givenName.trim() !== "") {
        return givenName;
    }
    return null;
}`;

    const givenName = "Joakim";
    const familyName = "Johnsson";

    const getFullName = (givenName, familyName) => {
        if (givenName && givenName.trim() !== "" && familyName && familyName.trim() !== "") {
            return givenName + " " + familyName;
        } else if (familyName && familyName.trim() !== "") {
            return familyName;
        } else if (givenName && givenName.trim() !== "") {
            return givenName;
        }
        return null;
    }


    return (
        <div className={"sms-section--light mb-3"}>
            <h3 className={"mb-4"}>Get full name</h3>
            <p className={"text-label"}>PP kod</p>
            <pre className={"border p-2"}><code>{getFullNameJava}</code></pre>
            <p className={"text-label"}>JS kod</p>
            <pre className={"border p-2"}><code>{getFullNameJS}</code></pre>
            <p>givenName: Joakim</p>
            <p>familyName: Johnsson</p>
            <p className={"alert alert-success"}>Output: {getFullName(familyName, givenName)}</p>
        </div>
    )
}
