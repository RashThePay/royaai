'use client'

import { NextUIProvider } from '@nextui-org/react'

import PiwikProProvider from '@piwikpro/next-piwik-pro'

export function Providers({ children }) {
  return (
    <PiwikProProvider
      containerId="76e7b5bf-d374-47e6-aaf0-1daf007260a5"
      containerUrl="https://royaai.piwik.pro"
    >
      <NextUIProvider>

        {children}
      </NextUIProvider>
    </PiwikProProvider>
  )
}