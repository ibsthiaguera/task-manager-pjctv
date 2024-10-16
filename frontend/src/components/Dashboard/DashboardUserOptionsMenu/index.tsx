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
import EditIcon from '@mui/icons-material/Edit'
import FormatListBulletedIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { openEditUserModal, openDeleteUserModal, setSelectedUser } from '@/redux/user/reducer'
import { fetchTasksByUser, openShowTasksModal } from '@/redux/task/reducer'


interface DashboardUserOptionsMenuProps {
    userId: string
}

const DashboardUserOptionsMenu = ({
    userId,
}: DashboardUserOptionsMenuProps) => {
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
        dispatch(setSelectedUser(userId))
        dispatch(fetchTasksByUser(userId)).then(() => {
            dispatch(openShowTasksModal())
        })
        handleClose()
    }

    const handleEditUser = () => {
        dispatch(setSelectedUser(userId));        
        dispatch(openEditUserModal());
        handleClose();
    }

    const handleDeleteUser = () => {
        dispatch(openDeleteUserModal(userId))
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
                <MenuItem onClick={handleEditUser}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Editar Usuário</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteUser}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Excluir Usuário</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DashboardUserOptionsMenu
