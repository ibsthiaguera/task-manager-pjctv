import { Box, Button, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchUsersBySquad, closeDeleteUserModal } from '@/redux/user/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const DeleteUserModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isDeleteUserModalOpen = useSelector(
        (state: RootState) => state.user.isDeleteUserModalOpen
    )
    const selectedSquadId = useSelector(
        (state: RootState) => state.squad.selectedSquadId
    )
    const selectedUserId = useSelector(
        (state: RootState) => state.user.selectedUserId
    )

    const handleCloseModal = () => {
        dispatch(closeDeleteUserModal())
    }

    const token = getCookieClient()

    const handleDeleteUser = async () => {
        try {
            await api.delete('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: selectedUserId,
                },
            })
            enqueueSnackbar('Usuário excluído com sucesso!', {
                variant: 'success',
            })
            dispatch(closeDeleteUserModal())
            if (selectedSquadId) dispatch(fetchUsersBySquad(selectedSquadId))
        } catch (error) {
            enqueueSnackbar('Erro ao excluir o usuárop.', { variant: 'error' })
        }
    }

    return (
        <Modal
            open={isDeleteUserModalOpen}
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
                    Tem certeza que deseja excluir este Usuário? Essa ação não pode
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
                        onClick={handleDeleteUser}
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

export default DeleteUserModal
