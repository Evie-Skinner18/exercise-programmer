import { Review } from "../../models/review.js";
import mongoose from "mongoose";

export default class ReviewsProvider {

    async createReview(restaurantId, review) {    
        try {
            const newReview = new Review({
                id: mongoose.Types.ObjectId(),
                restaurant_id: mongoose.Types.ObjectId(restaurantId),
                review: review.review,
                number_of_stars: review.number_of_stars,
                username: review.username,
                date: review.date
            });
            return await Review.create(newReview);    
        } catch (error) {
            console.error(`Could not create review by ${review.username}. Error: ${error}`);
        }
    }
}