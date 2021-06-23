import type { AppProps } from 'next/app'
import React from 'react'

import '../services/firebase/config'
import { AuthProvider } from '../contexts/AuthContext'

import '../styles/global.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
