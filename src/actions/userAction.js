import { userService } from '../services/userService';
import { userStore } from '../reducer/userReducer';

export const userAction = {
    createUser,
    getAllUser,
    addTodo,
    getAllTodos,
    RemoveDataFromLocalStorage,
    updateTodo,
    updateUser,

}

function createUser(user) {
    return (dispatch, getState) => {
        return userService.createUser(user).then(
                res => {
                    return dispatch(success(res));
                },
                (error) => { return error }
            )
    }
    function success(res) { return { type: 'USER_ACTION', payload: res } }
}

function addTodo(todo) {
    return (dispatch, getState) => {
        return userService.addTodo(todo).then(
            res => {
                return dispatch(successTodo(res));
            },
            (error) => { return error }
        )
    }
    function successTodo(res) { return { type: 'SET_ALL_TODO_ACTION', payload: res } }
}

function getAllTodos() {
    return (dispatch, getState) => {
        return userService.getAllTodos()
            .then(
                res => {
                    return dispatch(success(res));
                },
                (error) => { return error }
            )
    }

    function success(res) { return { type: 'SET_ALL_TODO_ACTION', payload: res } }
}

function getAllUser() {
    return (dispatch, getState) => {
        return userService.getAllUser()
            .then(
                res => {
                    return dispatch(success(res));
                },
                (error) => { return error }
            )
    }

    function success(res) { return { type: 'USER_ACTION', payload: res } }
}

function updateUser(user) {
    return (dispatch, getState) => {
        return userService.updateUser(user)
            .then(
                res => {
                    return dispatch(success(res));
                },
                (error) => { return error }
            )
    }

    function success(res) { return { type: 'USER_ACTION', payload: res } }
}

function updateTodo(todo) {
    return (dispatch, getState) => {
        return userService.updateTodo(todo)
            .then(
                res => {
                    return dispatch(success(res));
                },
                (error) => { return error }
            )
    }

    function success(res) { return { type: 'SET_ALL_TODO_ACTION', payload: res } }
}

function RemoveDataFromLocalStorage( key, type) {
    return (dispatch, getState) => {
        return userService.RemoveDataFromLocalStorage(key, type)
            .then(
                res => {
                    if(type == 'todos') {
                        return dispatch(successTodo(res));
                    } else {
                        return dispatch(successUser(res));
                    }
                },
                (error) => { return error }
            )
    }

    function successUser(res) { return { type: 'USER_ACTION', payload: res } }
    function successTodo(res) { return { type: 'SET_ALL_TODO_ACTION', payload: res } }
}
// function getAllSuccess(res) { return { type: 'USER_ACTION', ...res } }