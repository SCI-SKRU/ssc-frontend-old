import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: BookingState
}

type BookingState = {
  schoolname: string
  schoolsize: string
  subaddress: string[]
  countconnect: number
  operator: string
  position: string
  email: string
  mobile: string
  countclassroom: string
  cours: number
  dateSelect: string[]
}

const initialState = {
  value: {
    schoolname: "",
    schoolsize: "",
    subaddress: [],
    countconnect: 0,
    operator: "",
    position: "",
    email: "",
    mobile: "",
    countclassroom: "",
    cours: 0,
    dateSelect: [],
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
