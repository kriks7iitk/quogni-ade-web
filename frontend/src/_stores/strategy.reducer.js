import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchStrategy = createAsyncThunk(
  'strategy/fetchStrategy',
  async (strategyId) => {
    return {};
  }
);

export const handleTrayElementDragEnd = createAsyncThunk(
  'strategy/handleTrayElementDragEnd',
  async ({over, activeItem}) => {
    const data = activeItem?.data?.current;
    const newItem = {
      id: `${data?.type}_${over.id}`,
      name: data.name,
      type: data.type,
      position: {
        y: 0,
      },
    };
    return {overId:over.id, item:newItem};
  }
);

const userSlice = createSlice({
  name: 'strategy',
  initialState: { data: new Array(5), loading:false },
  reducers: {
    updateDefinition: (state,action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStrategy.rejected, (state, action) => {
        state.loading = false;
      });
      builder
      .addCase(handleTrayElementDragEnd.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleTrayElementDragEnd.fulfilled, (state, action) => {
        state.loading = false;
        const { newItem, overId } = action?.payload;
        const strategyDef = state.data;
        const currentTimeLineState = strategyDef[over.id];
        state.data[overId] = [
          ...currentTimeLineState,
          newItem
        ];
      })
      .addCase(handleTrayElementDragEnd.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { updateDefinition } = userSlice.actions;

export default userSlice.reducer;
