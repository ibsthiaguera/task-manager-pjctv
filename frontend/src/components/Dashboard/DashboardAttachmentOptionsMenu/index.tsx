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
import { openDeleteAttachmentModal } from '@/redux/attachment/reducer'

import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { enqueueSnackbar } from 'notistack'

interface DashboardAttachmentOptionsMenuProps {
    attachmentId: string
}

const DashboardAttachmentOptionsMenu = ({
    attachmentId,
}: DashboardAttachmentOptionsMenuProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const token = getCookieClient()

    const handleDownloadAttachment = async () => {
        try {
            const response = await api.get('/attachment', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id: attachmentId,
                },
            })

            const { file, fileName } = response.data

            // Decodifica o arquivo base64
            const binary = atob(file)
            const array = []
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i))
            }

            const blob = new Blob([new Uint8Array(array)], {
                type: 'application/octet-stream',
            })

            const downloadUrl = window.URL.createObjectURL(blob)

            // Cria um link temporário para download
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = fileName // Usa o nome do arquivo retornado
            document.body.appendChild(link)
            link.click()
            link.remove()

            enqueueSnackbar('Download realizado com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        } catch (error) {
            enqueueSnackbar('Erro ao fazer download do arquivo.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
        handleClose()
    }

    const handleDeleteAttachment = () => {
        dispatch(openDeleteAttachmentModal(attachmentId))
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
                <MenuItem onClick={handleDownloadAttachment}>
                    <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Baixar Anexo</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteAttachment}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Excluir Anexo</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DashboardAttachmentOptionsMenu
