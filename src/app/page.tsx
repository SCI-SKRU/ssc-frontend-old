import React from "react"
import { ConfigProvider } from "antd"
import theme from "../theme/themeConfig"
import CCalendar from "@/components/Calendar"

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <CCalendar />
    </div>
  </ConfigProvider>
)

export default HomePage
