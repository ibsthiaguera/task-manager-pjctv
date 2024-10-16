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
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeCreateUserModal } from '@/redux/user/reducer'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchSquads } from '@/redux/squad/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const CreateUserModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isUserModalOpen = useSelector(
        (state: RootState) => state.user.isCreateUserModalOpen
    )
    const squadList = useSelector((state: RootState) => state.squad.squadList)

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userSquadId, setUserSquadId] = useState<number | null>(null)

    const token = getCookieClient()

    const handleRegisterUser = async (
        name: string,
        email: string,
        password: string,
        role: string,
        squad_id: number | null
    ) => {
        try {
            const response = await api.post('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                name,
                email,
                password,
                role,
                squad_id,
            })

            enqueueSnackbar('Usuário cadastrado com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })

            dispatch(fetchSquads())

            handleCloseModal()
        } catch (error) {
            enqueueSnackbar('Erro ao salvar usuário.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    const handleCloseModal = () => {
        dispatch(closeCreateUserModal())
    }

    return (
        <Modal
            open={isUserModalOpen}
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
                    Cadastrar Novo Usuário
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
                    label="Email"
                    variant="outlined"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    label="Senha"
                    variant="outlined"
                    value={userPassword}
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
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
                    <InputLabel id="squad-label">Squad</InputLabel>
                    <Select
                        labelId="squad-label"
                        value={userSquadId}
                        label="Squad"
                        onChange={(e) => setUserSquadId(Number(e.target.value))}
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
                                userPassword,
                                userRole,
                                userSquadId
                            )
                        }
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

export default CreateUserModal
