import * as actions from './actionTypes'

export function taskReducer(state = [], action) {
    switch (action.type) {
        case actions.taskUpdated:
            const updateArray = [ ...state ]
            const indexUpdate = updateArray.findIndex((el) => el.id === action.payload.id)
            // console.log(newArray1)
            // console.log(index1)
            // console.log(newArray1[index1])
            // console.log(action.payload)
            updateArray[indexUpdate] = {...updateArray[indexUpdate], ...action.payload}
            return  updateArray
        case actions.taskDeleted:
            // const deleteArray = [ ...state ]
            // const indexDelete = deleteArray.findIndex((el) => el.id === action.payload.id)
            // deleteArray.splice(indexDelete,1)
            // return  deleteArray
            return [ ...state ].filter(el => el.id !== action.payload.id)
        default: return state
    }
}