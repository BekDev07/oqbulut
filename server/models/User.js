const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  roles: {
    type: [String],
    enum: ["user", "owner", "admin"],
    required: true,
    default: ["user"],
  },
  profileImages: [{ type: String }], // Profile images for both users and owners
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // Fields specific to clients (users)
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  reservations: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
      date: Date,
      partySize: Number,
    },
  ],
  // Fields specific to owners
  ownedRestaurants: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
      active: {
        type: Boolean,
        default: true,
      },
      restaurantImages: [{ type: String }], // Images specific to each restaurant owned by the user
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
