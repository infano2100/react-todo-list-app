import { ADD_TODO, GET_TODO, DEL_TODO, EDIT_TODO, TOGGLE_TODO } from '../config'

export const addTodo = data => ({
  type: ADD_TODO,
  payload: data
})

export const getTodo = () => {
  return (dispatch, getState) => {
    let content = getState()

    dispatch({
      type: GET_TODO,
      payload: {
        lists: content
      }
    })
  }
}

export const delTodo = id => ({
  type: DEL_TODO,
  payload: id
})

export const editTodo = data => ({
  type: EDIT_TODO,
  payload: data
})

export const changeStatusTodo = id => ({
  type: TOGGLE_TODO,
  payload: id
})
