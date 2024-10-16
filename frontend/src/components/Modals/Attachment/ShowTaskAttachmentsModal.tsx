import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeShowAttachmentsModal } from '@/redux/attachment/reducer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomToolbar from '@/components/CustomToolbar'
import { Attachment } from '@/types/attachment.types'
import DashboardAttachmentOptionsMenu from '@/components/Dashboard/DashboardAttachmentOptionsMenu'

const ShowTaskAttachmentsModal = () => {

    const dispatch = useDispatch<AppDispatch>()
    const isShowAttachmentsModalOpen = useSelector(
        (state: RootState) => state.attachment.isShowAttachmentsModalOpen
    )
    const attachmentList = useSelector((state: RootState) => state.attachment.attachmentList)

    const handleCloseModal = () => {
        dispatch(closeShowAttachmentsModal())
    }

    const columns: GridColDef[] = [
        { field: 'original_name', headerName: 'Arquivo', flex: 0.5 },
        {
            field: 'description',
            headerName: 'Descrição',
            flex: 0.5,
        },
        {
            field: 'options',
            headerName: 'Opções',
            align: 'center',
            headerAlign: 'center',
            hideable: false,
            renderCell: (params) => (
                <DashboardAttachmentOptionsMenu attachmentId={params.row.id} />
            ),
        },
    ]

    const rows = attachmentList.map((item: Attachment) => ({
        id: item.id,
        original_name: item.original_name,
        description: item.description,
        file_name: item.file_name,
    }))

    return (
        <Dialog
            open={isShowAttachmentsModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            maxWidth="md"
            fullWidth
            sx={{
                height: '90vh',
                overflow: 'auto',
            }}
        >
            <DialogTitle id="modal-title">Anexos da Task</DialogTitle>
            <DialogContent>
                <Paper
                    sx={{
                        height: 356,
                        p: 1,
                        py: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <DataGrid
                        className="striped-rows"
                        density="compact"
                        columns={columns}
                        rows={rows}
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id}
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                        pageSizeOptions={[10]}
                        sx={{
                            height: '22px',
                            fontSize: '0.8rem',
                            m: 1,
                        }}
                    />
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowTaskAttachmentsModal
