import mongoose from "mongoose";

export const RestaurantSchema = new mongoose.Schema({
    _id: String,
    address: {},
    borough: String,
    cuisine: String,
    grades: [],
    name: String,
    restaurant_id: String
});

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

