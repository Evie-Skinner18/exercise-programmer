import { Restaurant } from "../../models/restaurant.js";

export default class RestaurantsProvider {

    async getRestaurants({
        query = null,
        pageNumber = 0,
        restaurantsPerPage = 0
    } = {}) {

        let restaurants = [];

        try {
            console.log("Getting restaurants..");
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