import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user.types'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface UserState {
    selectedUserId: string | null
    userList: User[]
    isShowUsersModalOpen: boolean
    isCreateUserModalOpen: boolean
    isEditUserModalOpen: boolean
    isDeleteUserModalOpen: boolean
}

const initialState: UserState = {
    selectedUserId: null,
    userList: [],
    isShowUsersModalOpen: false,
    isCreateUserModalOpen: false,
    isEditUserModalOpen: false,
    isDeleteUserModalOpen: false,
}

const token = getCookieClient()

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await api.get('/user/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
})

export const fetchUsersBySquad = createAsyncThunk(
    'task/fetchUsersBySquad',
    async (squadId: string) => {
        const response = await api.get(`/user/squad`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { squad_id: squadId },
        })
        return response.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser(state, action: PayloadAction<string>) {
            state.selectedUserId = action.payload
        },
        setUserList(state, action: PayloadAction<User[]>) {
            state.userList = action.payload
        },
        addUser(state, action: PayloadAction<User>) {
            state.userList.push(action.payload)
        },
        openShowUsersModal(state) {
            state.isShowUsersModalOpen = true
        },
        closeShowUsersModal(state) {
            state.isShowUsersModalOpen = false
        },
        openCreateUserModal(state) {
            state.isCreateUserModalOpen = true
        },
        closeCreateUserModal(state) {
            state.isCreateUserModalOpen = false
        },
        openEditUserModal(state) {
            state.isEditUserModalOpen = true
        },
        closeEditUserModal(state) {
            state.isEditUserModalOpen = false
        },
        openDeleteUserModal(state, action: PayloadAction<string>) {
            state.isDeleteUserModalOpen = true
            state.selectedUserId = action.payload
        },
        closeDeleteUserModal(state) {
            state.isDeleteUserModalOpen = false
            state.selectedUserId = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.userList = action.payload
        }),
            builder.addCase(fetchUsersBySquad.fulfilled, (state, action) => {
                state.userList = action.payload
            })
    },
})

export const {
    setSelectedUser,
    setUserList,
    addUser,
    openShowUsersModal,
    closeShowUsersModal,
    openCreateUserModal,
    closeCreateUserModal,
    openEditUserModal,
    closeEditUserModal,
    openDeleteUserModal,
    closeDeleteUserModal,
} = userSlice.actions
export default userSlice.reducer
