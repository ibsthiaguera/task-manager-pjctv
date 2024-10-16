import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { closeCreateAttachmentModal } from '@/redux/attachment/reducer'
import { addAttachment } from '@/redux/attachment/reducer'
import { enqueueSnackbar } from 'notistack'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

const CreateAttachmentModal = () => {
    const dispatch = useDispatch()
    const isAttachmentModalOpen = useSelector(
        (state: RootState) => state.attachment.isCreateAttachmentModalOpen
    )
    const taskId = useSelector(
        (state: RootState) => state.task.selectedTaskId
    )
    const [attachmentDescription, setAttachmentDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [originalFileName, setOriginalFileName] = useState('')

    const token = getCookieClient()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setOriginalFileName(file.name)
        }
    }

    const handleRegisterAttachment = async () => {
        if (!selectedFile) {
            enqueueSnackbar('Por favor, selecione um arquivo.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
            return
        }

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('description', attachmentDescription)
        formData.append('task_id', String(taskId))

        try {
            const response = await api.post('/attachment', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            enqueueSnackbar('Anexo cadastrado com sucesso.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })

            handleCloseModal()
        } catch (error) {
            enqueueSnackbar('Erro ao salvar anexo.', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            })
        }
    }

    const handleCloseModal = () => {
        dispatch(closeCreateAttachmentModal())
    }

    return (
        <Modal
            open={isAttachmentModalOpen}
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
                    width: 600,
                }}
            >
                <Typography id="modal-title" variant="h6">
                    Adicionar Anexo
                </Typography>
                <TextField
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    size="small"
                    value={attachmentDescription}
                    onChange={(e) => setAttachmentDescription(e.target.value)}
                    sx={{ mt: 2 }}
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginTop: '20px' }}
                />

                {originalFileName && (
                    <Typography sx={{ mt: 2 }}>
                        Arquivo selecionado: {originalFileName}
                    </Typography>
                )}

                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
                >
                    <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleRegisterAttachment}
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

export default CreateAttachmentModal
