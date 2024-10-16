import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '@/types/task.types'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface TaskState {
    selectedTaskId: string | null
    taskList: Task[]
    isShowTasksModalOpen: boolean
    isCreateTaskModalOpen: boolean
    isEditTaskModalOpen: boolean
    isDeleteTaskModalOpen: boolean
}

const initialState: TaskState = {
    selectedTaskId: null,
    taskList: [],
    isShowTasksModalOpen: false,
    isCreateTaskModalOpen: false,
    isEditTaskModalOpen: false,
    isDeleteTaskModalOpen: false,
}
const token = getCookieClient()

export const fetchTasksBySquad = createAsyncThunk(
    'task/fetchTasksBySquad',
    async (squadId: string) => {
        const response = await api.get(`/task/squad`, {     
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { squad_id: squadId },
        })
        return response.data
    }
)

export const fetchTasksByUser = createAsyncThunk(
    'task/fetchTasksByUser',
    async (userId: string) => {
        const response = await api.get(`/task/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { user_id: userId },
        })
        return response.data
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setSelectedTask(state, action: PayloadAction<string>) {
            state.selectedTaskId = action.payload
        },
        setTaskList(state, action: PayloadAction<Task[]>) {
            state.taskList = action.payload
        },
        addTask(state, action: PayloadAction<Task>) {
            state.taskList.push(action.payload)
        },
        openShowTasksModal(state) {
            state.isShowTasksModalOpen = true
        },
        closeShowTasksModal(state) {
            state.isShowTasksModalOpen = false
        },
        openCreateTaskModal(state) {
            state.isCreateTaskModalOpen = true
        },
        closeCreateTaskModal(state) {
            state.isCreateTaskModalOpen = false
        },
        openEditTaskModal(state) {
            state.isEditTaskModalOpen = true
        },
        closeEditTaskModal(state) {
            state.isEditTaskModalOpen = false
        },
        openDeleteTaskModal(state, action: PayloadAction<string>) {
            state.isDeleteTaskModalOpen = true
            state.selectedTaskId = action.payload
        },
        closeDeleteTaskModal(state) {
            state.isDeleteTaskModalOpen = false
            state.selectedTaskId = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasksBySquad.fulfilled, (state, action) => {
            state.taskList = action.payload
        })
        builder.addCase(fetchTasksByUser.fulfilled, (state, action) => {
            state.taskList = action.payload
        })
    },
})

export const {
    setSelectedTask,
    setTaskList,
    addTask,
    openShowTasksModal,
    closeShowTasksModal,
    openCreateTaskModal,
    closeCreateTaskModal,
    openEditTaskModal,
    closeEditTaskModal,
    openDeleteTaskModal,
    closeDeleteTaskModal
} = taskSlice.actions
export default taskSlice.reducer
