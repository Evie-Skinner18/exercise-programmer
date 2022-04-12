import ReviewsProvider from "./providers/reviewsProvider.js";

export default class ReviewsController {

    constructor() {
        this.provider =  new ReviewsProvider();
    }

    async post(req, res, next) {
      try {
        const provider = new ReviewsProvider();
        const restaurantId = req.body.restaurant_id;
        const review = req.body.review;

        console.log(restaurantId);

        review.date = new Date();
        review.number_of_stars = review.number_of_stars? parseInt(review.number_of_stars) : 0;
  
        const ReviewResponse = await provider.createReview(
          restaurantId,
          review
        )

        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  
    async put(req, res, next) {
      try {
        const reviewId = req.body.review_id
        const text = req.body.text
        const date = new Date()
  
        const reviewResponse = await this.provider.updateReview(
          reviewId,
          req.body.user_id,
          text,
          date,
        )
  
        var { error } = reviewResponse
        if (error) {
          res.status(400).json({ error })
        }
  
        if (reviewResponse.modifiedCount === 0) {
          throw new Error(
            "unable to update review - user may not be original poster",
          )
        }
  
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  
    async delete(req, res, next) {
      try {
        const reviewId = req.query.id
        const userId = req.body.user_id
        console.log(reviewId)
        const reviewResponse = await this.provider.deleteReview(
          reviewId,
          userId,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  }