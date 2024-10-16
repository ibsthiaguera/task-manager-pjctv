import { combineReducers } from '@reduxjs/toolkit'
import attachmentReducer from './attachment/reducer'
import squadReducer from './squad/reducer'
import taskReducer from './task/reducer'
import userReducer from './user/reducer'

const rootReducer = combineReducers({
    attachment: attachmentReducer,
    squad: squadReducer,
    task: taskReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
