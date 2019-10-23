import {VALIDATE_USER_CREDENTAILS, LOGIN_USER_FETCHING, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from '../actions/actionTypes'
import { Copy } from '../helpers'

function validateInput (user) {

    user.usernameError = user.username.length < 1 ? Copy.usernameError : ''
    user.passwordError = user.password.length < 1 ? Copy.pwdError : ''

    return !user.usernameError && !user.passwordError

}

function dispatchErrorAction (dispatch, user) {

    dispatch({type: LOGIN_USER_ERROR, payload: user})

}

function authenticateUser (dispatch, user) {

        dispatch({type: LOGIN_USER_FETCHING, payload: user})
        // now make call to auth user

    setTimeout(() => {

        dispatch({type: LOGIN_USER_SUCCESS, payload: user})

    }, 800)

}

export default ({dispatch}) => {

    return next => action => {

        if (!action.type || action.type !== VALIDATE_USER_CREDENTAILS) {

            return next(action)

        }

        let user = {username: action.payload.username, password: action.payload.password}

         validateInput(user) ? authenticateUser(dispatch, user) : dispatchErrorAction(dispatch, user)

    }

}

import {FILTER_PROJECTS, SORT_PROJECTS, FILTER_HISTORY , UPDATE_PROJECTS, UPDATE_HISTORY, SORT_HISTORY} from '../actions/actionTypes'
import {sortByProjectId} from '../helpers'


function filterByField (field, text, list){

    return list.filter((obj) => {

        return obj[field].toLowerCase().indexOf(text) !== -1

    })
}

export default ({ dispatch, getState }) => {

    return next => action => {

        if (action.type) {

            if (action.type === FILTER_PROJECTS) {

                let list = getState().projects.projects
                let text = action.payload.filterText,
                    field = action.payload.field

                if (text.length) {

                    let filtered = filterByField(field, text, list)

                    dispatch({type: UPDATE_PROJECTS, payload: filtered})

                } else {

                    dispatch({type: UPDATE_PROJECTS, payload: list})

                }

            }

            if (action.type === SORT_PROJECTS) {

                const list = getState().projects.currentProjects.slice() // have to have a new array

                sortByProjectId(action.payload.key, action.payload.sortASC, list)

                dispatch({type: UPDATE_PROJECTS, payload: list})

            }

            if (action.type === FILTER_HISTORY) {

                let list = getState().projects.projectHistories,
                    text = action.payload.filterText,
                    field = action.payload.field

                if (text.length) {

                    let filtered = filterByField(field, text, list)

                    dispatch({type: UPDATE_HISTORY, payload: filtered})

                } else {

                    dispatch({type: UPDATE_HISTORY, payload: list})

                }

            }

            if (action.type === SORT_HISTORY) {

                const list = getState().projects.projectHistories.slice() // have to have a new array
                let key = action.payload.key

                if (key === 'project') {

                    sortByProjectId(key, action.payload.sortASC, list)

                } else {

                    list.sort()

                }


                dispatch({type: UPDATE_HISTORY, payload: list})

            }

        }
        return next(action)

    }

}


