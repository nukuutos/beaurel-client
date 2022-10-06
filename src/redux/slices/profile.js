import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  id: null,
  isPublicView: false,
  ratingStats: { ratingCounters: [] },
  lastName: '',
  masters: [],
  reviews: [],
  role: 'master',
  isAvatar: false,
  // customer
  appointmentsData: { siblingAppointment: {}, appointmentsCount: 0 },
  reviewsCount: 0,
}; // try every props get null (redirect)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {
      const { profile } = action.payload;

      return {
        ...state,
        ...profile,
      };
    },

    updateAbout: (state, action) => ({
      ...state,
      aboutText: action.payload,
    }),

    updateAvatar: (state) => ({
      ...state,
      isAvatar: true,
    }),

    updatePlaceOfWork: (state, action) => ({
      ...state,
      placeOfWork: action.payload,
    }),

    updateProfileCity: (state, action) => ({
      ...state,
      city: action.payload,
    }),

    getReviewOnScroll: (state, action) => {
      const newReviews = [...state.reviews, ...action.payload];

      return {
        ...state,
        reviews: newReviews,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.profile,
    }),
  },
});

const { actions, reducer } = profileSlice;

export const {
  getProfile,
  updateAbout,
  updateAvatar,
  updatePlaceOfWork,
  updateProfileCity,
  getReviewOnScroll,
} = actions;

export default reducer;
