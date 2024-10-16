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
import { closeShowUsersModal } from '@/redux/user/reducer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomToolbar from '@/components/CustomToolbar'
import DashboardUserOptionsMenu from '@/components/Dashboard/DashboardUserOptionsMenu'
import { User } from '@/types/user.types'

const ShowSquadUsersModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isShowUsersModalOpen = useSelector(
        (state: RootState) => state.user.isShowUsersModalOpen
    )
    const userList = useSelector((state: RootState) => state.user.userList)

    const handleCloseModal = () => {
        dispatch(closeShowUsersModal())
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 0.5 },
        {
            field: 'role',
            headerName: 'Perfil',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'tasks',
            headerName: 'Total de Tasks',
            align: 'center',
            headerAlign: 'center',
            flex: 0.3,
            valueGetter: (value, row) => row.tasks.length,
        },
        {
            field: 'options',
            headerName: 'Opções',
            align: 'center',
            headerAlign: 'center',
            hideable: false,
            renderCell: (params) => (
                <DashboardUserOptionsMenu userId={params.row.id} />
            ),
        },
    ]

    const rows = userList.map((item: User) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        role:
            item.role.charAt(0).toUpperCase() +
            item.role.slice(1).toLowerCase(),
        tasks: item.task || [],
    }))

    return (
        <Dialog
            open={isShowUsersModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle id="modal-title">Users da Squad</DialogTitle>
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

export default ShowSquadUsersModal
