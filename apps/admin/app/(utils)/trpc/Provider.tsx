'use client'

import { SERVER_TRPC_URL } from '@admin/app/(lib)/constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import type { Session } from 'next-auth'
import React, { useState } from 'react'

import { trpc } from './client'

export function TrpcProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: SERVER_TRPC_URL,
          async headers() {
            return session?.user
              ? {
                  authorization: `Bearer ${session?.user.accessToken}`,
                }
              : {}
          },
        }),
      ],
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
