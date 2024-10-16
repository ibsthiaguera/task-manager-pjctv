import { Box, Button, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchTasksBySquad, closeDeleteTaskModal } from '@/redux/task/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const DeleteTaskModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isDeleteTaskModalOpen = useSelector(
        (state: RootState) => state.task.isDeleteTaskModalOpen
    )
    const selectedSquadId = useSelector(
        (state: RootState) => state.squad.selectedSquadId
    )
    const selectedTaskId = useSelector(
        (state: RootState) => state.task.selectedTaskId
    )

    const handleCloseModal = () => {
        dispatch(closeDeleteTaskModal())
    }

    const token = getCookieClient()

    const handleDeleteTask = async () => {
        try {
            await api.delete('/task', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: selectedTaskId,
                },
            })
            enqueueSnackbar('Task excluída com sucesso!', {
                variant: 'success',
            })
            dispatch(closeDeleteTaskModal())
            if (selectedSquadId) dispatch(fetchTasksBySquad(selectedSquadId))
        } catch (error) {
            enqueueSnackbar('Erro ao excluir a task.', { variant: 'error' })
        }
    }

    return (
        <Modal
            open={isDeleteTaskModalOpen}
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
                    Tem certeza que deseja excluir esta Task? Essa ação não pode
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
                        onClick={handleDeleteTask}
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

export default DeleteTaskModal
