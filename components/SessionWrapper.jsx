'use client'
import nextAuth from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  )
}
export default SessionWrapper
