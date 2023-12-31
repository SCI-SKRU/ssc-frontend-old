import { Sarabun } from 'next/font/google'
import React from 'react'

import { AppProvider } from '@/contexts/BookingContext'
import StyledComponentsRegistry from '../lib/AntdRegistry'

const sarabun = Sarabun({
  subsets: ['thai'],
  weight: '400',
})

export const metadata = {
  title: 'SSC-SKRU',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={sarabun.className} style={{ margin: 0 }}>
      <StyledComponentsRegistry>
        <AppProvider>{children}</AppProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
)

export default RootLayout
