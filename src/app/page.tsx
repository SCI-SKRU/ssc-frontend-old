"use client"

import React from "react"
import { Button, ConfigProvider } from "antd"
import theme from "../theme/themeConfig"
import Link from "next/link"

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <Button type="primary">
        <Link href={"/booking"}>จองคอร์ส</Link>
      </Button>
    </div>
  </ConfigProvider>
)

export default HomePage
