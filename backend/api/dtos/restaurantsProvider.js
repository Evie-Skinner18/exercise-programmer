import { Restaurant } from "../../models/restaurant.js";

export default class RestaurantsProvider {

    getRestaurants() {
        Restaurant.find({ borough: "Queens" }, function(err, allRestaurants){
            if (err) {
                return "No restaurants found";
            } else {
                console.log(allRestaurants);
                return allRestaurants;
            }
        });
    }
}