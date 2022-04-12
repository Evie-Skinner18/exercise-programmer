import { Restaurant } from "../../models/restaurant.js";

export default class RestaurantsProvider {

    async getRestaurants({
        filters = null,
        pageNumber = 0,
        restaurantsPerPage = 0
    } = {}) {

        let restaurants = [];

        try {
            let query

            if (filters) {
                if ("name" in filters) {
                    query = { $text: { $search: filters["name"] } }
                } else if ("cuisine" in filters) {
                    query = { "cuisine": { $eq: filters["cuisine"] } }
                } else if ("borough" in filters) {
                    query = { "borough": { $eq: filters["borough"] } }
                }
            }
            restaurants = await Restaurant.find(query)
                .limit(restaurantsPerPage)
                .skip(restaurantsPerPage * pageNumber);
        } catch (error) {
            console.error(`Unable to issue find operation. Error:${error}`);
            return restaurants;
        }

        return restaurants;
    }
}