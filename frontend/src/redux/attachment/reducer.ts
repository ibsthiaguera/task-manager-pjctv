import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Attachment } from '@/types/attachment.types'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface AttachmentState {
    selectedAttachmentId: string | null
    attachmentList: Attachment[]
    isShowAttachmentsModalOpen: boolean
    isCreateAttachmentModalOpen: boolean
    isDeleteAttachmentModalOpen: boolean
}

const initialState: AttachmentState = {
    selectedAttachmentId: null,
    attachmentList: [],
    isShowAttachmentsModalOpen: false,
    isCreateAttachmentModalOpen: false,
    isDeleteAttachmentModalOpen: false,
}

const token = getCookieClient()

export const fetchAttachmentsByTask = createAsyncThunk(
    'task/fetchAttachmentsByTask',
    async (taskId: string) => {
        const response = await api.get(`/attachment/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { task_id: taskId },
        })
        return response.data
    }
)

const attachmentSlice = createSlice({
    name: 'attachment',
    initialState,
    reducers: {
        setSelectedAttachment(state, action: PayloadAction<string>) {
            state.selectedAttachmentId = action.payload
        },
        setAttachmentList(state, action: PayloadAction<Attachment[]>) {
            state.attachmentList = action.payload
        },
        addAttachment(state, action: PayloadAction<Attachment>) {
            state.attachmentList.push(action.payload)
        },
        openShowAttachmentsModal(state) {
            state.isShowAttachmentsModalOpen = true
        },
        closeShowAttachmentsModal(state) {
            state.isShowAttachmentsModalOpen = false
        },
        openCreateAttachmentModal(state, action: PayloadAction<string>) {
            state.isCreateAttachmentModalOpen = true
        },
        closeCreateAttachmentModal(state) {
            state.isCreateAttachmentModalOpen = false
        },
        openDeleteAttachmentModal(state, action: PayloadAction<string>) {
            state.isDeleteAttachmentModalOpen = true
            state.selectedAttachmentId = action.payload
        },
        closeDeleteAttachmentModal(state) {
            state.isDeleteAttachmentModalOpen = false
            state.selectedAttachmentId = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAttachmentsByTask.fulfilled, (state, action) => {
            state.attachmentList = action.payload
        })
    },
})

export const {
    setSelectedAttachment,
    setAttachmentList,
    addAttachment,
    openShowAttachmentsModal,
    closeShowAttachmentsModal,
    openCreateAttachmentModal,
    closeCreateAttachmentModal,
    openDeleteAttachmentModal,
    closeDeleteAttachmentModal,
} = attachmentSlice.actions
export default attachmentSlice.reducer
