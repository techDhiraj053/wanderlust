const Listing = require("../models_1/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//New
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Show Route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  //if listing does not exist->flash message:
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    //and then redirect to index page
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

//Create
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  req.flash("success", "New Listing Created!");
  //redirect to homepage
  res.redirect("/listings");
};

//Edit
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    //and then redirect to index page
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_120");
  //render
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//Update
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  //Update- findByIdAndUpdate()
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  //redirect to Show Route Page
  res.redirect(`/listings/${id}`);
};

//Delete
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  //Delete- findByIdAndDelete()
  let deleteListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  //redirect
  res.redirect("/listings");
};
