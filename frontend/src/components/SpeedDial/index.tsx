import React from 'react'

import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddTaskIcon from '@mui/icons-material/AddTask'

import { useDispatch } from 'react-redux'
import { openCreateUserModal } from '@/redux/user/reducer'
import { openCreateTaskModal } from '@/redux/task/reducer'
import { openCreateSquadModal } from '@/redux/squad/reducer'

const actions = [
    {
        icon: <GroupAddIcon />,
        name: 'Nova Squad',
        action: 'openSquadModal',
    },
    {
        icon: <PersonAddAlt1Icon />,
        name: 'Novo Usuário',
        action: 'openUserModal',
    },
    {
        icon: <AddTaskIcon />,
        name: 'Nova Tarefa',
        action: 'openTaskModal',
    },
]

export function DashboardSpeedDial() {
    const dispatch = useDispatch()

    const handleActionClick = (action: string) => {
        if (action === 'openSquadModal') {
            dispatch(openCreateSquadModal())
        } else if (action === 'openUserModal') {
            dispatch(openCreateUserModal())
        } else if (action === 'openTaskModal') {
            dispatch(openCreateTaskModal())
        }
    }
    return (
        <>
            <SpeedDial
                ariaLabel="Dashboard Actions"
                icon={<SpeedDialIcon />}
                direction={'up'}
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleActionClick(action.action)}
                    />
                ))}
            </SpeedDial>
        </>
    )
}
