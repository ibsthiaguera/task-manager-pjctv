import { useState } from 'react'
import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PeopleIcon from '@mui/icons-material/People'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setSelectedSquad, openDeleteSquadModal } from '@/redux/squad/reducer'
import { fetchTasksBySquad, openShowTasksModal } from '@/redux/task/reducer'
import { fetchUsersBySquad, openShowUsersModal } from '@/redux/user/reducer'

interface DashboardOptionsMenuProps {
    squadId: string
}

const DashboardOptionsMenu = ({ squadId }: DashboardOptionsMenuProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleShowTasks = () => {
        dispatch(setSelectedSquad(squadId))
        dispatch(fetchTasksBySquad(squadId)).then(() => {
            dispatch(openShowTasksModal())
        })
        handleClose()
    }

    const handleShowUsers = () => {
        dispatch(setSelectedSquad(squadId))
        dispatch(fetchUsersBySquad(squadId)).then(() => {
            dispatch(openShowUsersModal())
        })
        handleClose()
    }

    const handleDeleteSquad = () => {
        dispatch(openDeleteSquadModal(squadId))
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleShowTasks}>
                    <ListItemIcon>
                        <FormatListBulletedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Visualizar Tasks</Typography>
                </MenuItem>
                <MenuItem onClick={handleShowUsers}>
                    <ListItemIcon>
                        <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Visualizar Equipe</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteSquad}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Excluir Squad</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DashboardOptionsMenu
