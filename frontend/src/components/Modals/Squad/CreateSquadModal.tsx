import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { closeCreateSquadModal } from '@/redux/squad/reducer'
import { addSquad } from '@/redux/squad/reducer'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

const CreateSquadModal = () => {
    const dispatch = useDispatch()
    const isSquadModalOpen = useSelector(
        (state: RootState) => state.squad.isCreateSquadModalOpen
    )
    const [squadName, setSquadName] = useState('')

    const token = getCookieClient()

    const handleRegisterSquad = async (name: string) => {
        try {
            const response = await api.post('/squad', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                name,
            })
            const newSquad = { id: response.data.id, name, user: [] }

            dispatch(addSquad(newSquad))

            enqueueSnackbar('Squad cadastrada com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })

            handleCloseModal()
        } catch (error) {
            enqueueSnackbar('Erro ao salvar squad.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    const handleCloseModal = () => {
        dispatch(closeCreateSquadModal())
    }

    return (
        <Modal
            open={isSquadModalOpen}
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
                }}
            >
                <Typography id="modal-title" variant="h6">
                    Cadastrar Nova Squad
                </Typography>
                <TextField
                    fullWidth
                    label="Nome da Squad"
                    variant="outlined"
                    size="small"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
                >
                    <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleRegisterSquad(squadName)}
                        variant="contained"
                        color="primary"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateSquadModal
