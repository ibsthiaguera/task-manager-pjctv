import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomToolbar from '../../CustomToolbar'
import { Box, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'

import ShowTaskAttachmentsModal from '@/components/Modals/Attachment/ShowTaskAttachmentsModal'
import CreateAttachmentModal from '@/components/Modals/Attachment/CreateAttachmentModal'
import DeleteAttachmentModal from '@/components/Modals/Attachment/DeleteAttachmentModal'
import { Task } from '@/types/task.types'
import DashboardTaskOptionsMenu from '../DashboardTaskOptionsMenu'
import { formatDate } from 'date-fns'
import { useDispatch } from 'react-redux'
import EditTaskModal from '@/components/Modals/Task/EditTaskModal'

const DashboardTableFuncionario = () => {
    const dispatch = useDispatch<AppDispatch>()
    const taskList = useSelector((state: RootState) => state.task.taskList)

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Título', flex: 0.5 },
        { field: 'description', headerName: 'Descrição', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            width: 150,
        },
        {
            field: 'limit_date',
            headerName: 'Data Limite',
            align: 'center',
            headerAlign: 'center',
        },
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
        description: item.description,
        status:
            item.status.charAt(0).toUpperCase() +
            item.status.slice(1).toLowerCase(),
        limit_date: formatDate(new Date(item.limit_date), 'dd/MM/yyyy'),
    }))

    return (
        <>
            <Paper
                sx={{
                    height: 456,
                    p: 1,
                    py: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mx: 1,
                    }}
                >
                    <Typography variant="subtitle1">Dashboard</Typography>
                    <Box id="filter-panel"></Box>
                </Box>
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
            <ShowTaskAttachmentsModal />
            <EditTaskModal />
            <CreateAttachmentModal />
            <DeleteAttachmentModal />
        </>
    )
}

export default DashboardTableFuncionario
