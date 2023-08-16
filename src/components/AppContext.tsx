"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"

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

// Define the action types
type AppAction = { type: "SET_FIELD"; field: keyof AppState; value: any }

// Define the initial state
const initialState: AppState = {
  schoolname: "",
  schoolsize: 0,
  subaddress: [],
  operator: "",
  position: "",
  email: "",
  mobile: "",
  countclassroom: 0,
  cours: 0,
  dateSelect: [],
  subject_details: null,
}

// Define the reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

// Create the context
const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined)

// Create a context provider
interface AppProviderProps {
  children: ReactNode
}

// Create a context provider
export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to access the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
