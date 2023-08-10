import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { BookingState, InitialState } from "@/types/booking"

export const initialState = {
  value: {
    schoolname: "",
    schoolsize: "",
    subaddress: [],
    operator: "",
    position: "",
    email: "",
    mobile: "",
    countclassroom: "",
    cours: 0,
    dateSelect: [],
    coupon: "",
    subject_details: null,
  } as BookingState,
} as InitialState

export const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    showData: () => {
      return initialState
    },
    saveData: (state, action: PayloadAction<Partial<BookingState>>) => {
      return {
        value: {
          ...state.value,
          ...action.payload,
        },
      }
    },
  },
})

export const { showData, saveData } = booking.actions
export default booking.reducer
