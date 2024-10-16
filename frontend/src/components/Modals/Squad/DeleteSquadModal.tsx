import {
    Box,
    Button,
    Modal,
    Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchSquads, closeDeleteSquadModal } from '@/redux/squad/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const DeleteSquadModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isDeleteSquadModalOpen = useSelector(
        (state: RootState) => state.squad.isDeleteSquadModalOpen
    )
    const selectedSquadId = useSelector(
        (state: RootState) => state.squad.selectedSquadId
    )

    const handleCloseModal = () => {
        dispatch(closeDeleteSquadModal())
    }

    const token = getCookieClient()

    const handleDeleteSquad = async () => {
        try {            
            await api.delete('/squad', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: selectedSquadId,
                },
            })
            enqueueSnackbar('Squad excluída com sucesso!', { variant: 'success' })
            dispatch(closeDeleteSquadModal())
            dispatch(fetchSquads())
        } catch (error) {
            enqueueSnackbar('Erro ao excluir a squad.', { variant: 'error' })
        }
    }

    return (
        <Modal
            open={isDeleteSquadModalOpen}
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
                    Tem certeza que deseja excluir esta Squad? Essa ação não pode ser desfeita.
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
                        onClick={handleDeleteSquad}
                    >
                        Excluir
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteSquadModal
