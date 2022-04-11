import { Restaurant } from "../../models/restaurant.js";

export default class RestaurantsProvider {

    async getRestaurants({
        query = null,
        page = 0,
        restaurantsPerPage = 0
    } = {}) {

        let restaurants = [];

        try {
            console.log("Getting restaurants..");
            console.log(`query: ${query.name}`);
           restaurants = await Restaurant.find(query)
            .limit(restaurantsPerPage)
            .skip(restaurantsPerPage * page);
        } catch (error) {
            console.error(`Unable to issue find operation. Error:${error}`);
            return restaurants;
        }

        return restaurants.toArray();
    }
}