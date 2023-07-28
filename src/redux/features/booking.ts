import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: BookingState
}

type BookingState = {
  schoolname: string
  schoolsize: string
  subaddress: string
  countconnect: number
  operator: string
  position: string
  email: string
  mobile: string
  countclassroom: string
  cours: number
}

const initialState = {
  value: {
    schoolname: "",
    schoolsize: "",
    subaddress: "",
    countconnect: 0,
    operator: "",
    position: "",
    email: "",
    mobile: "",
    countclassroom: "",
    cours: 0,
  } as BookingState,
} as InitialState

export const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    showData: () => {
      return initialState
    },
    // befor
    // saveData: (state, action: PayloadAction<string>) => {
    //   return {
    //     value: {
    //       schoolname: action.payload,
    //       schoolsize: action.payload,
    //       subaddress: action.payload,
    //       countconnect: 1,
    //       operator: action.payload,
    //       position: action.payload,
    //       email: action.payload,
    //       mobile: action.payload,
    //       countclassroom: action.payload,
    //       cours: action.payload,
    //     },
    //   }
    // },
    // after
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
