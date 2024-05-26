import { createSlice } from '@reduxjs/toolkit';
import { getAllInstructions, getInstructionsDetails } from 'src/api/instruction';

const initialState = {
  instrctions: [],
  instructionsLoading: false,

  detail: {},
  detailLoading: false,
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
      })

      .addCase(getInstructionsDetails.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(getInstructionsDetails.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.detailLoading = false;
      })
      .addCase(getInstructionsDetails.rejected, (state) => {
        state.detailLoading = false;
      });
  },
});

export default instructionSlice.reducer;
