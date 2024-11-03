// NOTE: Supabase policies needed for buckets. Example =>
// Authenticated can edit buckets jocke4.0
// authenticated
// (bucket_id = "avatar-images"::text)
export const BUCKETS = {
    AVATAR_IMAGES: "avatar-images",
    ISSUE_IMAGES: "issue-images",
    TITLE_IMAGES: "title-images",
    PUBLISHER_IMAGES: "publisher-images",
}

export const TABLES = {
    ISSUES: "issues",
    MESSAGES: "messages",
    PROFILES: "profiles",
    PUBLISHERS: "publishers",
    TITLES: "titles",
    USER_TOTAL_VALUATION_VALUES: "user_total_valuation_values",
    USERS_TITLES: "users_titles",
    USERS_ISSUES: "users_issues",
    USERS_ISSUES_WANTED: "users_issues_wanted",
    USERS_ISSUES_UPGRADE: "users_issues_upgrade",
    USERS_ISSUES_FAVORITE: "users_issues_favorite",
    USERS_TITLES_FAVORITE: "users_titles_favorite",
    GRADES: "grades",
    GRADE_VALUES: "grade_values",
    UTILS: "utils",
    USERS: "users"
}