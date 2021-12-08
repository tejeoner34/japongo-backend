import { retrieveAllReviews } from "./reviews.model.js";


export async function getAllReviews(req, res){
    const reviews = await retrieveAllReviews();
    res.json(reviews);
}