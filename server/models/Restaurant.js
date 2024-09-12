const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  contactInformation: {
    phone: String,
    email: String,
    website: String,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
  priceRange: {
    type: String,
    enum: ["Cheap", "Moderate", "Expensive"],
    required: true,
  },
  ratings: [
    {
      type: Number,
      min: 0,
      max: 5,
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  featuredImage: {
    type: String, // URL of the image
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reservationSystem: {
    available: Boolean,
    capacity: Number,
    bookings: {
      morning: {
        isBooked: { type: Boolean, default: false },
        bookingDetails: {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          partySize: Number,
          date: Date,
        },
      },
      afternoon: {
        isBooked: { type: Boolean, default: false },
        bookingDetails: {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          partySize: Number,
          date: Date,
        },
      },
      evening: {
        isBooked: { type: Boolean, default: false },
        bookingDetails: {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          partySize: Number,
          date: Date,
        },
      },
    },
  },
  specialOffers: {
    type: String,
  },
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
});

restaurantSchema.index({ location: "2dsphere" }); // Index for geospatial queries

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
