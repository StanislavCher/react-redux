export function thunk({getState, dispatch}) {
// export function thunk(store) {
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

            if (typeof action === 'function') {
                // console.log('function')
                action(getState, dispatch)
            } else {
                // console.log(typeof action)
                return next(action)
            }
        }
    }
}