const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middelware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Search listings by country
router.get("/search", async (req, res) => {
  try {
    const { country } = req.query;
    let listings;

    if (country) {
      listings = await Listing.find({
        country: { $regex: new RegExp(country, "i") },
      });
    } else {
      listings = await Listing.find({});
    }

    if (listings.length === 0) {
      req.flash("error", `No listings found for "${country}"`);
      return res.redirect("/listings");
    }

    res.render("listings/index", { allListings: listings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while searching!");
    res.redirect("/listings");
  }
});

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
