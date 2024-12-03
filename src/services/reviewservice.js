import {supabase} from "../supabase/supabaseClient.js";
import {TABLES} from "../helpers/constants/serviceConstants.js";

export const addStarReview = async (userId, itemType, itemId, stars) => {
    try {
        const { data, error, status } = await supabase
            .from(TABLES.REVIEWS)
            .insert([{
                user_id: userId,
                item_type: itemType,
                item_id: itemId,
                stars,
            }]);
        if (error && status !== 406) {
            console.error(error);
        }
        return data;
    } catch (error) {
        console.error("Error adding review: ", error);
    }
};

export const updateStarReview = async (reviewId, stars) => {
    try {
        const { data, error, status } = await supabase
            .from(TABLES.REVIEWS)
            .update({ stars })
            .eq('id', reviewId);
        if (error && status !== 406) {
            console.error(error);
        }
        return data;
    } catch (error) {
        console.error('Error updating review:', error);
    }
};

export const getReviewByUserIdItemTypeAndId = async (userId, itemType, itemId) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.REVIEWS)
            .select("*")
            .eq("user_id", userId)
            .eq("item_type", itemType)
            .eq("item_id", itemId)
            .single()
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching review:', error);
    }
}



