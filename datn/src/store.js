import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./reducers/task_slice"

export default configureStore({
    reducer: {
        task: taskReducer,
    },
})