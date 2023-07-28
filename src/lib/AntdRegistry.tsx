"use client"

import React from "react"
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs"
import { useServerInsertedHTML } from "next/navigation"
import { ReduxProvider } from "@/redux/provider"

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cache = createCache()
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ))
  return (
    <StyleProvider cache={cache}>
      <ReduxProvider>{children}</ReduxProvider>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry
