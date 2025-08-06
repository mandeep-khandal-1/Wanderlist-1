const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Funsplash-app&psig=AOvVaw19z7CfD1isaN4js2ESY_w9&ust=1752319561291000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjC_JnZtI4DFQAAAAAdAAAAABAE",
    set: (v) =>
      v === ""
        ? " https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Funsplash-app&psig=AOvVaw19z7CfD1isaN4js2ESY_w9&ust=1752319561291000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjC_JnZtI4DFQAAAAAdAAAAABAE"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

