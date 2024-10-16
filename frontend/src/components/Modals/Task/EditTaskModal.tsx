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
import { closeEditTaskModal, fetchTasksBySquad } from '@/redux/task/reducer'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { fetchUsers } from '@/redux/user/reducer'
import { getCookieClient } from '@/lib/cookieClient'

const EditTaskModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isEditTaskModalOpen = useSelector(
        (state: RootState) => state.task.isEditTaskModalOpen
    )
    const selectedTaskId = useSelector(
        (state: RootState) => state.task.selectedTaskId
    )
    const selectedSquadId = useSelector(
        (state: RootState) => state.squad.selectedSquadId
    )
    const userList = useSelector((state: RootState) => state.user.userList)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskLimitDate, setTaskLimitDate] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [taskUserId, setTaskUserId] = useState('')

    const token = getCookieClient()

    useEffect(() => {
        if (isEditTaskModalOpen && selectedTaskId) {
            const fetchTask = async () => {
                try {
                    const response = await api.get('/task', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            id: selectedTaskId,
                        },
                    })
                    setTaskTitle(response.data.title)
                    setTaskDescription(response.data.description)
                    setTaskLimitDate(response.data.limit_date.split('T')[0])
                    setTaskStatus(response.data.status)
                    setTaskUserId(response.data.user.id)
                } catch (error) {
                    enqueueSnackbar('Erro ao carregar a tarefa.', {
                        variant: 'error',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    })
                }
            }

            fetchTask()
        }
    }, [isEditTaskModalOpen, selectedTaskId, dispatch])

    useEffect(() => {
        if (isEditTaskModalOpen) {
            dispatch(fetchUsers())
        }
    }, [isEditTaskModalOpen, dispatch])

    const handleRegisterTask = async (
        title: string,
        description: string,
        limitDate: string,
        status: string,
        taskUserId: string
    ) => {
        try {
            const response = await api.put(`/task`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                id: Number(selectedTaskId),
                title,
                description,
                limit_date: limitDate,
                status,
                user_id: Number(taskUserId),
            })

            enqueueSnackbar('Task alterada com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })

            handleCloseModal()

            if (selectedSquadId) dispatch(fetchTasksBySquad(selectedSquadId))
        } catch (error) {
            enqueueSnackbar('Erro ao alterar task.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    const handleCloseModal = () => {
        dispatch(closeEditTaskModal())
        setTaskTitle('')
        setTaskDescription('')
        setTaskLimitDate('')
        setTaskStatus('')
        setTaskUserId('')
    }

    return (
        <Modal
            open={isEditTaskModalOpen}
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
                    Dados da Task
                </Typography>
                <TextField
                    fullWidth
                    label="Título"
                    variant="outlined"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    label="Descrição"
                    variant="outlined"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    label="Data Limite"
                    variant="outlined"
                    value={taskLimitDate}
                    type="date"
                    onChange={(e) => setTaskLimitDate(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="role-label">Status</InputLabel>
                    <Select
                        labelId="role-label"
                        value={taskStatus}
                        label="status"
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <MenuItem value="pendente">Pendente</MenuItem>
                        <MenuItem value="em andamento">Em Andamento</MenuItem>
                        <MenuItem value="concluida">Concluída</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="user-label">Usuário</InputLabel>
                    <Select
                        labelId="user-label"
                        value={taskUserId}
                        label="Usuário"
                        onChange={(e) => setTaskUserId(e.target.value)}
                    >
                        {userList.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
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
                            handleRegisterTask(
                                taskTitle,
                                taskDescription,
                                new Date(taskLimitDate)
                                    .toISOString()
                                    .slice(0, 19),
                                taskStatus,
                                taskUserId
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

export default EditTaskModal
