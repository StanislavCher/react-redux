//export function logger({getState, dispatch}) {
export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // Do anything here: pass the action onwards with next(action),
            // or restart the pipeline with storeAPI.dispatch(action)
            // Can also use storeAPI.getState() here

            // console.log(store)
            // console.log(next)
            // console.log(action)
            // if(action.type === 'task/update') {
            //     return  dispatch({type: 'task/remove',
            //     payload: { ...action.payload }
            //     })
            // }

            return next(action)
        }
    }
}