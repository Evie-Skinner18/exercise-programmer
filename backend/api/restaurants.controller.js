import RestaurantsProvider from "./dtos/restaurantsProvider.js";

export default class RestaurantsController {
    provider = new RestaurantsProvider();

    async get(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 0;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
        let filters = {};

        const restaurants = await this.provider.getRestaurants(filters)
    }
}


const restaurantsQuery = { borough: "Queens" };
const getRestaurantsSearchParams = { query: restaurantsQuery, page: 1, restaurantsPerPage: 20 };
