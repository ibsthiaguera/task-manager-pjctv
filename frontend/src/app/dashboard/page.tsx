'use client'

import { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import DashboardTableGerente from '@/components/Dashboard/DashboardTableGerente'
import DashboardTableFuncionario from '@/components/Dashboard/DashboardTableFuncionario'
import { DashboardSpeedDial } from '../../components/SpeedDial'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'

import { useDispatch } from 'react-redux'
import { setSquadList } from '@/redux/squad/reducer'
import { setTaskList } from '@/redux/task/reducer'
import { getCookieClient } from '@/lib/cookieClient'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

interface CustomJwtPayload {
    id: string
    role: string
}

const App = () => {
    const token = getCookieClient()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState('')

    async function getSquadList() {
        try {
            const response = await api.get('/squad/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(setSquadList(response.data))
        } catch (error) {
            enqueueSnackbar('Erro ao buscar informações das squads.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    async function getTaskList() {
        try {
            const response = await api.get('/task/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { user_id: userId },
            })
            dispatch(setTaskList(response.data))
        } catch (error) {
            enqueueSnackbar('Erro ao buscar informações das squads.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    useEffect(() => {
        const token = getCookie('session')
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(
                    token as string
                )
                setUserRole(decodedToken.role)
                setUserId(decodedToken.id)
            } catch (error) {
                console.error('Erro ao decodificar o token:', error)
            }
        }
    }, [])

    useEffect(() => {
        if (userRole === 'gerente') {
            getSquadList()
        } else if (userRole === 'funcionario') {
            getTaskList()
        }
    }, [userRole])

    return (
        <MainLayout>
            {userRole === 'gerente' ? (
                <>
                    <DashboardTableGerente />
                    <DashboardSpeedDial />
                </>
            ) : (
                <>
                    <DashboardTableFuncionario />
                </>
            )}
        </MainLayout>
    )
}

export default App
