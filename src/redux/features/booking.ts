import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: BookingState
}

type SubjectDate = {
  day?: string
  subject: {
    subsubject: string
    mainsubject: string
  }
  activity?: boolean
}

type SubjectDetails = {
  [key: string]: SubjectDate | undefined
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
  coupon: string
  subject_details: SubjectDetails | null
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
