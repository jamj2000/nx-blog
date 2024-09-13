"use client"
import { SessionProvider } from "next-auth/react";


export function ClientSession({ children }) {

  return (
    <SessionProvider >
      {children}
    </SessionProvider>
  )

}