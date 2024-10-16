import { useState } from 'react'
import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { openEditTaskModal, setSelectedTask } from '@/redux/task/reducer'
import { openDeleteTaskModal } from '@/redux/task/reducer'
import {
    fetchAttachmentsByTask,
    openCreateAttachmentModal,
    openShowAttachmentsModal,
} from '@/redux/attachment/reducer'

import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AttachFileIcon from '@mui/icons-material/AttachFile'

interface DashboardTaskOptionsMenuProps {
    taskId: string
}

const DashboardTaskOptionsMenu = ({
    taskId,
}: DashboardTaskOptionsMenuProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleCreateAttachment = () => {
        dispatch(setSelectedTask(taskId))        
        dispatch(openCreateAttachmentModal(taskId))        
        handleClose()
    }

    const handleShowAttachments = () => {
        dispatch(setSelectedTask(taskId))
        dispatch(fetchAttachmentsByTask(taskId)).then(() => {
            dispatch(openShowAttachmentsModal())
        })
        handleClose()
    }

    const handleEditTask = () => {
        dispatch(setSelectedTask(taskId))
        dispatch(openEditTaskModal())
        handleClose()
    }

    const handleDeleteTask = () => {
        dispatch(openDeleteTaskModal(taskId))
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
                <MenuItem onClick={handleCreateAttachment}>
                    <ListItemIcon>
                        <Add fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Adicionar Anexo</Typography>
                </MenuItem>
                <MenuItem onClick={handleShowAttachments}>
                    <ListItemIcon>
                        <AttachFileIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Visualizar Anexos</Typography>
                </MenuItem>
                <MenuItem onClick={handleEditTask}>
                    <ListItemIcon>
                        <FormatListBulletedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Editar Task</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteTask}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Excluir Task</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DashboardTaskOptionsMenu
