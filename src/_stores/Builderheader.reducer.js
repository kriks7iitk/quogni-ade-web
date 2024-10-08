import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chartData: {},
  selectedOption: '',
};


const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartData: (state, action) => {
      const { option, data } = action.payload;
      state.chartData[option] = data;
    },

    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
      console.log('selectedOption', state.selectedOption);
    },
  },
});

export const { setChartData, setSelectedOption } = chartSlice.actions;

export default chartSlice.reducer;
