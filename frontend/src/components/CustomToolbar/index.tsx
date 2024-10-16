import { Portal } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'

const CustomToolbar = () => {
    return (
        <Portal container={() => document.getElementById('filter-panel')!}>
            <GridToolbarQuickFilter />
        </Portal>
    )
}

export default CustomToolbar
