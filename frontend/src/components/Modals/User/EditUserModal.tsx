import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeEditUserModal, fetchUsersBySquad } from '@/redux/user/reducer'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

const EditUserModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isEditUserModalOpen = useSelector(
        (state: RootState) => state.user.isEditUserModalOpen
    )
    const selectedUserId = useSelector(
        (state: RootState) => state.user.selectedUserId
    )
    const selectedSquadId = useSelector(
        (state: RootState) => state.squad.selectedSquadId
    )
    const squadList = useSelector((state: RootState) => state.squad.squadList)

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userSquadId, setUserSquadId] = useState('')

    const token = getCookieClient()

    useEffect(() => {
        if (isEditUserModalOpen && selectedUserId) {
            const fetchUser = async () => {
                try {
                    const response = await api.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            id: selectedUserId,
                        },
                    })
                    setUserName(response.data.name)
                    setUserEmail(response.data.email)
                    setUserRole(response.data.role)
                    setUserSquadId(response.data.squad.id)
                } catch (error) {
                    enqueueSnackbar('Erro ao carregar o usuário.', {
                        variant: 'error',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    })
                }
            }

            fetchUser()
        }
    }, [isEditUserModalOpen, selectedUserId, dispatch])

    const handleRegisterUser = async (
        name: string,
        email: string,
        role: string,
        userSquadId: string
    ) => {
        try {
            const response = await api.put(`/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                id: Number(selectedUserId),
                name,
                email,
                role,
                squad_id: Number(userSquadId),
            })

            enqueueSnackbar('User alterada com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })

            handleCloseModal()

            if (selectedSquadId) dispatch(fetchUsersBySquad(selectedSquadId))
        } catch (error) {
            enqueueSnackbar('Erro ao alterar user.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    const handleCloseModal = () => {
        dispatch(closeEditUserModal())
        setUserName('')
        setUserEmail('')
        setUserRole('')
        setUserSquadId('')
    }

    return (
        <Modal
            open={isEditUserModalOpen}
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
                    Dados do Usuário
                </Typography>
                <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    label="Email"
                    variant="outlined"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="role-label">Perfil</InputLabel>
                    <Select
                        labelId="role-label"
                        value={userRole}
                        label="perfil"
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <MenuItem value="gerente">Gerente</MenuItem>
                        <MenuItem value="funcionario">Funcionário</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="user-label">Usuário</InputLabel>
                    <Select
                        labelId="user-label"
                        value={userSquadId}
                        label="Usuário"
                        onChange={(e) => setUserSquadId(e.target.value)}
                    >
                        {squadList.map((squad) => (
                            <MenuItem key={squad.id} value={squad.id}>
                                {squad.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
                >
                    <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={() =>
                            handleRegisterUser(
                                userName,
                                userEmail,
                                userRole,
                                userSquadId
                            )
                        }
                        variant="contained"
                        color="primary"
                    >
                        Alterar Dados
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditUserModal
