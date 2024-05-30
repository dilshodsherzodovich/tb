import { createSlice } from '@reduxjs/toolkit';
import {
  closeInstruction,
  confirmUsersAttendance,
  getAllInstructions,
  getInstructionsDetails,
} from 'src/api/instruction';

const initialState = {
  instrctions: [],
  instructionsLoading: false,

  detail: {},
  detailLoading: false,

  // user attendance
  confirmAttendanceRes: {},
  confirmAttendanceLoading: false,
  confirmingUsers: [],

  // close instruction
  closeRes: {},
  closing: false,
};

const instructionSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: {
    clearCloseRes: (state) => {
      state.closeRes = {};
      state.closing = false;
    },
  },
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
      })

      .addCase(confirmUsersAttendance.pending, (state, action) => {
        state.confirmAttendanceLoading = true;
        const instructionIdx = state.confirmingUsers?.findIndex(
          (item) => item?.id === action.meta.arg.id
        );

        if (instructionIdx >= 0) {
          state.confirmingUsers[instructionIdx].users?.push(action.meta.arg.data?.user_id);
        } else {
          state.confirmingUsers.push({
            id: action.meta.arg.id,
            users: [action.meta.arg.data?.user_id],
          });
        }
      })
      .addCase(confirmUsersAttendance.fulfilled, (state, action) => {
        state.detail = action.payload.instruction;
        state.confirmAttendanceLoading = false;
        const instructionIdx = state.confirmingUsers?.findIndex(
          (item) => item?.id === action.meta.arg.id
        );
        state.confirmingUsers[instructionIdx].users = state.confirmingUsers[
          instructionIdx
        ].users?.filter((item) => item !== action.meta.arg.data?.user_id);
      })
      .addCase(confirmUsersAttendance.rejected, (state) => {
        state.confirmAttendanceLoading = false;
      })

      .addCase(closeInstruction.pending, (state) => {
        state.closing = true;
      })
      .addCase(closeInstruction.fulfilled, (state, action) => {
        state.closeRes = action.payload;
        state.closing = false;
      })
      .addCase(closeInstruction.rejected, (state) => {
        state.closing = false;
      });
  },
});

export const { clearCloseRes } = instructionSlice.actions;
export default instructionSlice.reducer;
