import RestaurantsProvider from "./dtos/restaurantsProvider.js";

export default class RestaurantsController {

    async get(req, res, next) {
        const provider = new RestaurantsProvider();

        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 0;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
        const filters = { borough: "Queens" };
        const getRestaurantsSearchParams = { query: filters, pageNumber: pageNumber, restaurantsPerPage: restaurantsPerPage};

        const restaurants = await provider.getRestaurants(getRestaurantsSearchParams);
        let response = {
            restaurants: restaurants,
            pageNumber: pageNumber,
            filters: filters,
            restaurantsPerPage: restaurantsPerPage,
            totalNumberOfRestaurants: restaurants.length
        }

        res.json(response);
    }
}


// const restaurantsQuery = { borough: "Queens" };
// const getRestaurantsSearchParams = { query: restaurantsQuery, page: 1, restaurantsPerPage: 20 };
