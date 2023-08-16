"use client"

import React, { createContext, useContext, useReducer } from "react"
import type { AppAction, AppProviderProps, AppState } from "../types/booking"

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

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined)

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
