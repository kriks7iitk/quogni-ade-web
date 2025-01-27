import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { marketDataService } from '../_services';

export const fetchIndex = createAsyncThunk(
  'rightDrawer/fetchIndex',
  async (stock) => {
    const response = await marketDataService.getIndexData(stock);
    const data = response.data;
    data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    return data;
  },
);

export const fetchStock = createAsyncThunk(
  'rightDrawer/fetchStock',
  async (stock) => {
    const response = await marketDataService.getOHLCData(stock);
    const data = response.data;
    data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    return data;
  },
);

export const fetchSignal = createAsyncThunk(
  'rightDrawer/fetchSignal',
  async ({ stock, strategyName }) => {
    const response = await marketDataService.getStockSignals(
      stock,
      strategyName,
    );

    return response.data;
  },
);

export const fetchStrategyName = createAsyncThunk(
  'rightDrawer/fetchStrategyName',
  async (stock) => {
    const response = await marketDataService.getStrategyNames();
    return response.data;
  },
);

export const fetchStockName = createAsyncThunk(
  'rightDrawer/fetchStockName',
  async (stock) => {
    const response = await marketDataService.getStockNames();

    return response.data;
  },
);

const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState: {
    showBackButton: false,
    loading: false,
    data: null,
    selectedStock: null,
    title: null,
    level: null,
  },
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
    updateTitleState: (state, action) => {
      state.title = action.payload;
    },
    updateRightDrawerJourneyState: (state, action) => {
      state.level = action.payload;
    },
    updateSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndex.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndex.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          indexData: action.payload,
        };
        state.loading = false;
      })
      .addCase(fetchIndex.rejected, (state) => {
        state.loading = false;
      })
      //For stock fetching
      .addCase(fetchStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          stockData: action.payload,
        };
        state.loading = false;
      })
      .addCase(fetchStock.rejected, (state) => {
        state.loading = false;
      })
      // For signal
      .addCase(fetchSignal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignal.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          signalData: action.payload,
        };
        state.loading = false;
      })
      .addCase(fetchSignal.rejected, (state) => {
        state.loading = false;
      })
      //for stock names
      .addCase(fetchStockName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockName.fulfilled, (state, action) => {

        state.data = {
          ...state.data,
          stockList: action.payload,
        };
        state.loading = false;
      })
      .addCase(fetchStockName.rejected, (state) => {

        state.loading = false;
      })
      //for strategy names
      .addCase(fetchStrategyName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStrategyName.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          strategyList: action.payload,
        };
        state.loading = false;
      })
      .addCase(fetchStrategyName.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  updateData,
  updateLoadingState,
  updateBackButtonState,
  updateTitleState,
  updateRightDrawerJourneyState,
  updateSelectedStock,
} = rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
