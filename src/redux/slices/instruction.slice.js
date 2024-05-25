import { createSlice } from '@reduxjs/toolkit';
import { getAllInstructions } from 'src/api/instruction';

const initialState = {
  instrctions: {},
  instructionsLoading: false,
};

const instructionSlice = createSlice({
  name: 'instructions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructions.pending, (state) => {
        state.instructionsLoading = true;
      })
      .addCase(getAllInstructions.fulfilled, (state, action) => {
        state.instrctions = action.payload;
        state.instructionsLoading = false;
      })
      .addCase(getAllInstructions.rejected, (state) => {
        state.instructionsLoading = false;
      });
  },
});

export default instructionSlice.reducer;
