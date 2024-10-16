import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

interface CustomJwtPayload {
    name: string
    role: string
}

const Header = () => {
    const [user, setUser] = useState({ name: '', role: '' })

    useEffect(() => {
        const token = getCookie('session')

        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(
                    token as string
                )
                setUser({
                    name: decodedToken.name,
                    role:
                        decodedToken.role.charAt(0).toUpperCase() +
                        decodedToken.role.slice(1).toLowerCase(),
                })
            } catch (error) {
                console.error('Erro ao decodificar o token:', error)
            }
        }
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 2,
                borderBottom: '1px solid #e0e0e0',
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#fff',
                zIndex: 1,
            }}
        >
            <Typography variant="subtitle2" sx={{ marginRight: 1 }}>
                Bem-vindo(a) {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                ({user.role})
            </Typography>
        </Box>
    )
}

export default Header
