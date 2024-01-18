'use client'

import { NextUIProvider } from '@nextui-org/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { TrpcProvider } from '../(utils)/trpc/Provider'

const Providers = ({
  children,
  session,
}: React.PropsWithChildren<{ session: Session | null }>) => {
  return (
    <SessionProvider session={session}>
      <TrpcProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </TrpcProvider>
    </SessionProvider>
  )
}

export default Providers
