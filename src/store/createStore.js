export function createStore(reducer, initialState) {
    let state = initialState
    let listeners = []
    function getState(){
        return state
    }
    // console.log((typeof reducer))
    function dispatch(action) {
        // console.log((typeof reducer))
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
    }
    function subscribe(listener) {
        listeners.push(listener)
    }

    return { getState, dispatch, subscribe }
}