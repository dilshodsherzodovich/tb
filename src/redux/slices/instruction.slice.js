import { createSlice } from '@reduxjs/toolkit';
import { faceRecognition } from 'src/api/auth';
import {
  addNewAttendance,
  closeInstruction,
  confirmUsersAttendance,
  getAllInstructions,
  getAllWorkShops,
  getInstructionCategories,
  getInstructionsDetails,
  startNewInstruction,
} from 'src/api/instruction';

const initialState = {
  instrctions: [],
  instructionsLoading: false,

  // create
  creating: false,
  createRes: {},

  // categories
  categories: [],
  categoriesLoading: false,

  // detail
  detail: {},
  detailLoading: false,

  // user attendance
  confirmAttendanceRes: {},
  confirmAttendanceLoading: false,
  confirmingUsers: [],

  // create attendance
  createAttendance: {},
  creatingAttendance: false,

  // workshops
  workshops: [],
  workshopsLoading: false,

  // const lastUserAddedtoAttendance
  lastUser: {},
  lastUserLoading: false,

  // close instruction
  closeRes: {},
  closing: false,

  //
  isCameraOn: false,
};

const instructionSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: {
    clearCloseRes: (state) => {
      state.closeRes = {};
      state.closing = false;
    },
    clearCreateRes: (state) => {
      state.createRes = {};
      state.creating = false;
    },
    clearCreateAttendanceRes: (state) => {
      state.createAttendance = {};
      state.creatingAttendance = false;
    },
    clearLastUser: (state) => {
      state.lastUser = null;
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

      // workshops
      .addCase(getAllWorkShops.pending, (state) => {
        state.workshopsLoading = true;
      })
      .addCase(getAllWorkShops.fulfilled, (state, action) => {
        state.workshops = action.payload;
        state.workshopsLoading = false;
      })
      .addCase(getAllWorkShops.rejected, (state) => {
        state.workshopsLoading = false;
      })

      // create
      .addCase(startNewInstruction.pending, (state) => {
        state.creating = true;
      })
      .addCase(startNewInstruction.fulfilled, (state, action) => {
        state.createRes = action.payload;
        state.creating = false;
      })
      .addCase(startNewInstruction.rejected, (state) => {
        state.creating = false;
      })

      // create attendance
      .addCase(addNewAttendance.pending, (state) => {
        state.creatingAttendance = true;
      })
      .addCase(addNewAttendance.fulfilled, (state, action) => {
        action?.payload?.forEach((item) => {
          const attendanceIdx = state.detail.attendance?.findIndex((att) => att?.id === item?.id);
          if (attendanceIdx >= 0) {
            state.detail.attendance[attendanceIdx] = item;
          } else {
            state.detail.attendance.push(item);
          }
        });
        state.creatingAttendance = false;
      })
      .addCase(addNewAttendance.rejected, (state) => {
        state.creatingAttendance = false;
      })

      .addCase(getInstructionCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getInstructionCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesLoading = false;
      })
      .addCase(getInstructionCategories.rejected, (state) => {
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
        const attendanceIdx = state.detail.attendance?.findIndex(
          (item) => item?.id === action.payload.id
        );
        state.detail.attendance[attendanceIdx] = action.payload;
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
      })

      .addCase(faceRecognition.pending, (state, action) => {
        state.isCameraOn = true;
      })
      .addCase(faceRecognition.fulfilled, (state, action) => {
        const errMessages1 = 'Belgilangan vaqt ichida foydalanuvchi topilmadi';
        if (action.payload?.message === state.lastUser) {
          state.lastUser = errMessages1;
        } else {
          state.lastUser = action.payload?.user || action.payload?.message;
        }
        state.isCameraOn = false;
      })
      .addCase(faceRecognition.rejected, (state) => {
        state.lastUser = null;
        state.isCameraOn = false;
      });
  },
});

export const { clearCloseRes, clearCreateRes, clearCreateAttendanceRes, clearLastUser } =
  instructionSlice.actions;
export default instructionSlice.reducer;
