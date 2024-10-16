import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomToolbar from '../../CustomToolbar'
import DashboardOptionsMenu from '../DashboardOptionsMenu'
import { Box, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Squad } from '@/types/squad.types'

import ShowSquadTasksModal from '@/components/Modals/Squad/ShowSquadTasksModal'
import ShowSquadUsersModal from '@/components/Modals/Squad/ShowSquadUsersModal'
import ShowTaskAttachmentsModal from '@/components/Modals/Attachment/ShowTaskAttachmentsModal'
import CreateAttachmentModal from '@/components/Modals/Attachment/CreateAttachmentModal'
import CreateSquadModal from '@/components/Modals/Squad/CreateSquadModal'
import CreateUserModal from '@/components/Modals/User/CreateUserModal'
import CreateTaskModal from '@/components/Modals/Task/CreateTaskModal'
import EditTaskModal from '@/components/Modals/Task/EditTaskModal'
import EditUserModal from '@/components/Modals/User/EditUserModal'
import DeleteAttachmentModal from '@/components/Modals/Attachment/DeleteAttachmentModal'
import DeleteSquadModal from '@/components/Modals/Squad/DeleteSquadModal'
import DeleteTaskModal from '@/components/Modals/Task/DeleteTaskModal'
import DeleteUserModal from '@/components/Modals/User/DeleteUserModal'

const DashboardTableGerente = () => {
    const squadList = useSelector((state: RootState) => state.squad.squadList)

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Squad', flex: 1 },
        {
            field: 'users',
            headerName: 'Equipe',
            flex: 2,
            valueGetter: (value, row) =>
                row.user
                    ? row.user.map((u: { name: string }) => u.name).join(', ')
                    : '',
        },
        {
            field: 'options',
            headerName: 'Opções',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            hideable: false,
            renderCell: (params) => <DashboardOptionsMenu squadId={params.row.id} />,
        },
    ]

    const rows = squadList.map((item: Squad) => ({
        id: item.id,
        nome: item.name,
        user: item.user || [],
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
            <ShowSquadTasksModal />
            <ShowSquadUsersModal />
            <ShowTaskAttachmentsModal />
            <CreateAttachmentModal />
            <CreateSquadModal />
            <CreateUserModal />
            <CreateTaskModal />
            <DeleteAttachmentModal />
            <DeleteSquadModal />
            <DeleteTaskModal />
            <DeleteUserModal />
            <EditTaskModal />
            <EditUserModal />
        </>
    )
}

export default DashboardTableGerente
