import React from "react"
import { Button, ConfigProvider } from "antd"
import theme from "../theme/themeConfig"
import Link from "next/link"

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <Link href={"/booking"}>
        <Button type="primary">Booking</Button>
      </Link>
    </div>
  </ConfigProvider>
)

export default HomePage
