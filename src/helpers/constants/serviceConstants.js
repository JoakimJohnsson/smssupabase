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