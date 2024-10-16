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
import { closeShowTasksModal } from '@/redux/task/reducer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomToolbar from '@/components/CustomToolbar'
import DashboardTaskOptionsMenu from '@/components/Dashboard/DashboardTaskOptionsMenu'
import { Task } from '@/types/task.types'
import { formatDate } from 'date-fns'

const ShowSquadTasksModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isShowTasksModalOpen = useSelector(
        (state: RootState) => state.task.isShowTasksModalOpen
    )
    const taskList = useSelector((state: RootState) => state.task.taskList)

    const handleCloseModal = () => {
        dispatch(closeShowTasksModal())
    }

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Título', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            width: 150
        },
        {
            field: 'limit_date',
            headerName: 'Data Limite',
            align: 'center',
            headerAlign: 'center',
        },
        { field: 'user', headerName: 'Usuário', flex: 0.5 },
        {
            field: 'options',
            headerName: 'Opções',
            align: 'center',
            headerAlign: 'center',
            hideable: false,
            renderCell: (params) => (
                <DashboardTaskOptionsMenu taskId={params.row.id} />
            ),
        },
    ]

    const rows = taskList.map((item: Task) => ({
        id: item.id,
        title: item.title,
        status:
            item.status.charAt(0).toUpperCase() +
            item.status.slice(1).toLowerCase(),
        limit_date: formatDate(new Date(item.limit_date), 'dd/MM/yyyy'),
        user: item.user ? item.user.name : 'N/A',
    }))

    return (
        <Dialog
            open={isShowTasksModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle id="modal-title">Tasks</DialogTitle>
            <DialogContent>
                <Paper
                    sx={{
                        height: 456,
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

export default ShowSquadTasksModal
