import { Box, Button, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchAttachmentsByTask, closeDeleteAttachmentModal } from '@/redux/attachment/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const DeleteAttachmentModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isDeleteAttachmentsModalOpen = useSelector(
        (state: RootState) => state.attachment.isDeleteAttachmentModalOpen
    )
    const selectedTaskId = useSelector(
        (state: RootState) => state.task.selectedTaskId
    )
    const selectedAttachmentId = useSelector(
        (state: RootState) => state.attachment.selectedAttachmentId
    )

    const handleCloseModal = () => {
        dispatch(closeDeleteAttachmentModal())
    }

    const token = getCookieClient()

    const handleDeleteAttachments = async () => {
        try {
            await api.delete('/attachment', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: selectedAttachmentId,
                },
            })
            enqueueSnackbar('Anexo excluído com sucesso!', {
                variant: 'success',
            })
            dispatch(closeDeleteAttachmentModal())
            if (selectedTaskId) dispatch(fetchAttachmentsByTask(selectedTaskId))
        } catch (error) {
            enqueueSnackbar('Erro ao excluir o anexo.', { variant: 'error' })
        }
    }

    return (
        <Modal
            open={isDeleteAttachmentsModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                    textAlign: 'center',
                }}
            >
                <Typography id="modal-title" variant="h6" gutterBottom>
                    Confirmar Exclusão
                </Typography>
                <Typography id="modal-description" variant="body1" gutterBottom>
                    Tem certeza que deseja excluir este anexo? Essa ação não pode
                    ser desfeita.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteAttachments}
                    >
                        Excluir
                    </Button>
                    <Button variant="outlined" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteAttachmentModal
