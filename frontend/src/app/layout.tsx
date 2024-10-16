'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import store from '../redux/store'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="pt-BR">
            <body>
                <SnackbarProvider />
                <Provider store={store}>{children}</Provider>
            </body>
        </html>
    )
}

export default Layout
