// import { createStore, compose, applyMiddleware } from 'redux'
import taskReducer from './task'
import { logger } from './middleware/logger'
// import { thunk } from './middleware/thunk'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import errorReducer from './errors'

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

// const middlewareEnhancer = applyMiddleware(logger, thunk)
function createStore(){
    return configureStore({
        // reducer: taskReducer,
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
        }
    )
}
// function configureStore(){
//     return createStore(taskReducer, compose(
//         middlewareEnhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     )
// }
export default createStore
