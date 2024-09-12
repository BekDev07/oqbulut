import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const restaurantsAdapter = createEntityAdapter({});

const initialState = restaurantsAdapter.getInitialState();

export const restaurantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => "/restaurants",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (responseData) => {
        const loadedRestaurants = responseData.map((restaurant) => {
          restaurant.id = restaurant._id; // normalized data looks for id, not _id
          return restaurant;
        });
        return restaurantsAdapter.setAll(initialState, loadedRestaurants);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Restaurant", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Restaurant", id })),
          ];
        } else return [{ type: "Restaurant", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetRestaurantsQuery } = restaurantsApiSlice;

export const selectRestaurantsResult =
  restaurantsApiSlice.endpoints.getRestaurants.select();

const selectRestaurantsData = createSelector(
  selectRestaurantsResult,
  (restaurantsResult) => restaurantsResult.data,
);

export const {
  selectAll: selectAllRestaurants,
  selectById: selectRestaurantById,
  selectIds: selectRestaurantIds,
} = restaurantsAdapter.getSelectors(
  (state) => selectRestaurantsData(state) ?? initialState,
);
