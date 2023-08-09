export type InitialState = {
  value: BookingState
}

export type SubjectDate = {
  day?: string
  subject: {
    subsubject: string
    mainsubject: string
  }
  activity?: boolean
}

export type SubjectDetails = {
  [key: string]: SubjectDate | undefined
}

export type BookingState = {
  schoolname: string
  schoolsize: string
  subaddress: string[]
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
