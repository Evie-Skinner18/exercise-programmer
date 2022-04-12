import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    id: String,
    review: String,
    date: String,
    number_of_stars: Number,
    restaurant_id: String,
    username: String,
});

export const Review = mongoose.model('Review', ReviewSchema);