const Listing = require("./models_1/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models_1/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirectUrl save
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// isOwner middleware

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Validation function for ListingSchema (Middleware)
module.exports.validateListing = (req, res, next) => {
  //Checking validation
  let { error } = listingSchema.validate(req.body);
  //if any error
  if (error) {
    //extracting error details and joining them with ","
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    //otherwise call next functions
    next();
  }
};

//Validation function for reviewSchema (Middleware)
module.exports.validateReview = (req, res, next) => {
  //Checking validation
  let { error } = reviewSchema.validate(req.body);
  //if any error
  if (error) {
    //extracting error details and joining them with ","
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    //otherwise call next functions
    next();
  }
};

// isReviewAuthor middleware

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
