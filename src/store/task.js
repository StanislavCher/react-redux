// import { createAction, createReducer } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import todosService from './services/todos.service'
import { setError } from './errors'

// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

// const update = createAction('task/updated')
// const remove = createAction('task/removed')

const initialState = {
    entities: [],
    isLoading: true,
    // error: null
}
// [
// {
//     id:1,
//     title: 'Task 1',
//     completed: false
// },
//     {
//         id:2,
//         title: 'Task 2',
//         completed: false
//     }
// ]

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requestFailed')

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        receive(state, action) {
            // console.log(state)
            // console.log(action)
            // console.log(action.payload)
            // state = { ...state.entities, ...action.payload}
            state.entities = action.payload
            state.isLoading = false
            // return action.payload
        },
        update(state, action) {
            // console.log(state.entities)
            // console.log(state)
            // console.log(action)
            // console.log(action.payload)
        const indexUpdate = state.entities.findIndex((el) => el.id === action.payload.id)
        state.entities[indexUpdate] = {...state.entities[indexUpdate], ...action.payload}
        },
        remove(state, action) {
            // console.log(state.entities)
            state.entities = state.entities.filter((el) => el.id !== action.payload.id)
            // return state.entities.filter(el => el.id !== action.payload.id)
        },
        create(state, action) {
            // console.log(action.payload)
            // console.log(state)
            const id = state.entities.length + 1
            state.entities.push({...action.payload, id})
            state.isLoading = false
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            // state.error = action.payload
            state.isLoading = false
        }
    }
})

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        // console.log('data1',data)
        dispatch(receive(data))
        // return data
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch) => {
    // dispatch(taskCompleted(taskId))
    dispatch(update({id, completed: true}))
}

// export function taskCompleted(id){
//     return update({id, completed: true})
//     // return {
//     //     type: TASK_UPDATED,
//     //     payload: {id, completed: true}
//     // }
// }
export function titleChanged(id){
    return update({id, title: `New title for task ${id}`})
    // return {
    //     type: TASK_UPDATED,
    //     payload:
    // }
}
export function taskDeleted(id){
    return remove({id})
    // return {
    //     type: TASK_DELETED,
    //     payload: {id}
    // }
}
export const getTasks = () => (state) => {
    return state.tasks.entities
}
export const getTasksLoadingStatus = () => (state) => {
    return state.tasks.isLoading
}

export const createTask = (task) => async (dispatch) => {
    // return create(task)
    dispatch(taskRequested())
    try {
        const data = await todosService.create(task)
        // console.log('data1',data)
        dispatch(create(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

// const taskReducer = createReducer([],(builder) => {
//     builder.addCase(update, (state, action) => {
//         const indexUpdate = state.findIndex((el) => el.id === action.payload.id)
//         state[indexUpdate] = {...state[indexUpdate], ...action.payload}
//     }).addCase(remove, (state, action) => {
//         return state.filter(el => el.id !== action.payload.id)
//     })
// })
// function taskReducer(state = [], action) {
//     switch (action.type) {
//         case update.type:
//             const updateArray = [ ...state ]
//             const indexUpdate = updateArray.findIndex((el) => el.id === action.payload.id)
//             updateArray[indexUpdate] = {...updateArray[indexUpdate], ...action.payload}
//             return  updateArray
//         case remove.type:
//             return [ ...state ].filter(el => el.id !== action.payload.id)
//         default: return state
//     }
// }
// export default taskReducer
const { actions, reducer: taskReducer } = taskSlice

 const {
    receive,
    update,
    remove,
    create,
    taskRequested,
    taskRequestFailed} = actions
export default taskReducer