import { ReactNode } from "react"

export interface AppProviderProps {
  children: ReactNode
}

interface SubjectDate {
  day?: string
  subject: {
    subsubject: string
    mainsubject: string
  }
  activity?: boolean
}

interface SubjectDetails {
  [key: string]: SubjectDate | undefined
}

export interface AppState {
  schoolname: string
  schoolsize: number
  subaddress: string[]
  operator: string
  position: string
  email: string
  mobile: string
  countclassroom: number
  cours: number
  dateSelect: string[]
  subject_details: SubjectDetails | null
}

export interface AppAction {
  type: "SET_FIELD"
  field: keyof AppState
  value: any
}
