import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Squad } from '../../types/squad.types'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface SquadState {
    selectedSquadId: string | null
    squadList: Squad[]
    isCreateSquadModalOpen: boolean
    isDeleteSquadModalOpen: boolean
}

const initialState: SquadState = {
    selectedSquadId: null,
    squadList: [],
    isCreateSquadModalOpen: false,
    isDeleteSquadModalOpen: false,
}

const token = getCookieClient()

export const fetchSquads = createAsyncThunk('squad/fetchSquads', async () => {
    const response = await api.get('/squad/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
})

const squadSlice = createSlice({
    name: 'squad',
    initialState,
    reducers: {
        setSelectedSquad(state, action: PayloadAction<string>) {
            state.selectedSquadId = action.payload
        },
        setSquadList(state, action: PayloadAction<Squad[]>) {
            state.squadList = action.payload
        },
        addSquad(state, action: PayloadAction<Squad>) {
            state.squadList.push(action.payload)
        },
        openCreateSquadModal(state) {
            state.isCreateSquadModalOpen = true
        },
        closeCreateSquadModal(state) {
            state.isCreateSquadModalOpen = false
        },
        openDeleteSquadModal(state, action: PayloadAction<string>) {
            state.isDeleteSquadModalOpen = true
            state.selectedSquadId = action.payload
        },
        closeDeleteSquadModal(state) {
            state.isDeleteSquadModalOpen = false
            state.selectedSquadId = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSquads.fulfilled, (state, action) => {
            state.squadList = action.payload
        })
    },
})

export const {
    setSelectedSquad,
    setSquadList,
    addSquad,
    openCreateSquadModal,
    closeCreateSquadModal,
    openDeleteSquadModal,
    closeDeleteSquadModal,
} = squadSlice.actions

export default squadSlice.reducer
