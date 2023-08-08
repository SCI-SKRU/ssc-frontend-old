"use client"

import React from "react"
import type { Dayjs } from "dayjs"
import { Calendar } from "antd"
import type { CalendarMode } from "antd/es/calendar/generateCalendar"
import "dayjs/locale/th"
import locale from "antd/es/date-picker/locale/th_TH"

const CCalendar: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode)
  }

  return <Calendar onPanelChange={onPanelChange} locale={locale} />
}

export default CCalendar
