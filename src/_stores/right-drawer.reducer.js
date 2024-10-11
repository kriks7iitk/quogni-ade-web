import { createSlice } from '@reduxjs/toolkit';

const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState: { showBackButton, loading: false, data: null },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateLoadingState: (state, action) => {
      state.loading = action.payload;
    },
    updateBackButtonState: (state, action) => {
      state.showBackButton = action.payload;
    },
  },
});

export const { updateData, updateBackButtonState, updateLoadingState } =
  rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
