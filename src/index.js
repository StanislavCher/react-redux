import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore } from './store/createStore'
// import { taskReducer } from './store/taskReducer'
// import * as actions from './store/actionTypes'
import configureStore from './store/store'
import {
    completeTask,
    createTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks,
    taskDeleted,
    titleChanged
} from './store/task'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'
// import {compose, pipe} from 'lodash/fp'



// const store = createStore(taskReducer, initialState)
const store = configureStore()
const App = () => {
  // function fn(){
  //   return 'App'
  // }
  //
  // const someFn = fn
  //
  // function someFn(fn) {
  //   return fn()
  // }
  //
  //   const arr = ['1','2','3']
  //   function arrFormat(el) {
  //       return el+'+ '
  //   }
  //   console.log(arr.map((el) => el + '+'))
  //   console.log(arr.map(arrFormat))
  //
  //   function someFn() {
  //   return function() {
  //       return 'App'
  //     }
  // }
  //
  // function fn(func) {
  //     return func()
  // }
  //
  // const fn = someFn()
  //
  // return <h1>{fn(someFn())}</h1>
  //   return <h1>{arr.map(arrFormat)}</h1>
  //
  //   const x = 2
  //   const y = x * 2
  //   const z = y * y
  //   let y = 6
  //   const y = 6
  //   const double = (number) => number * 2
  //   const square = (number) => number * number
  //   const output = square(double(x))
  //   const half =  (number) => number / 2
  //   const half =  (number) => number / Math.random()
  //   const half =  (number, y) => number / y
  //   console.log(half(12))
  //   y = 2
  //   console.log(half(12))
  //   const divide =  (num1, num2) => num1 / num2
  //   const divide = (num2) => {
  //       return function (num1) {
  //           return num1 / num2
  //       }
  //   }
  //
  //   const mathCalculate = compose(half, square, double)
  //   const mathCalculate = compose(double, square, half)
  //   const mathCalculate = pipe(double, square, half, divide(2))
  //
  //   const [state, setState] = useState({})
  //   setState(prevState => ({...prevState, id: '500'}))
  //   const obj1 = {
  //       id:2,
  //       name: 'some name',
  //       author: {
  //           name: 'some author name'
  //       }
  //   }
  //   // const obj2 = obj1
  //   const obj2 = { ...obj1, author: { ...obj1.author } }
  //   console.log(obj2 === obj1)
  //   console.log(obj2.author === obj1.author)
  //   return <h1>{output}</h1>
  //   return <h1>{mathCalculate(x)}</h1>

    // console.log(store.getState())
    // store.dispatch({type:'task/completed', payload: {id: 1}})

    // const [state, setState] = useState(store.getState())
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
        // store.dispatch(set())
        // store.subscribe(() => setState(store.getState()))
    },[])


    // const completeTask = (taskId) => {
    //     // store.dispatch(taskCompleted(taskId))
    //     store.dispatch((getState, dispatch)=>{
    //         console.log(getState)
    //         console.log(dispatch)
    //         store.dispatch(taskCompleted(taskId))
    //     })
    //     // console.log(store.getState())
    // }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
        // console.log(store.getState())
    }

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
        // console.log(store.getState())
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <p>{error}</p>
    }

    const newTask = {
        userId:1,
        title:"a new task added by me",
        completed: false
    }

    return (
        <>
            <h1>App</h1>
            <button onClick={() => dispatch(createTask(newTask))}>Create </button>
            <ul>
                {state.map((el) =>
                    (<li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>Complete </button>
                        <button onClick={() => changeTitle(el.id) }>Change Title </button>
                        <button onClick={() => deleteTask(el.id) }>Delete </button>
                        <hr />
                    </li>)
                )}
            </ul>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);

