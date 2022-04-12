import RestaurantsProvider from "./providers/restaurantsProvider.js";

export default class RestaurantsController {

    async get(req, res, next) {
        const provider = new RestaurantsProvider();

        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;

        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.borough) {
            filters.borough = req.query.borough
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const getRestaurantsSearchParams = { 
            filters: filters, 
            pageNumber: pageNumber, 
            restaurantsPerPage: restaurantsPerPage
        };

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