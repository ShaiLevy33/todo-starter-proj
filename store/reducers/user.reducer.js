import { userService } from "../../services/user.service.js"

//* balance
export const INCREMENT = 'INCREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

//*Activities   
export const ADD_TODO_TO_ACTIVITIES = 'ADD_TODO_TO_ACTIVITIES'
export const REMOVE_TODO_FROM_ACTIVITIES = 'REMOVE_TODO_FROM_ACTIVITIES'


const initialState = {
    balance: 10000,
    activities: [],
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case INCREMENT:
            return {
                ...state,
                balance: state.balance + 10
            }
        case CHANGE_BY:
            return {
                ...state,
                balance: state.balance + cmd.diff
            }

        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: cmd.score }
            return { ...state, loggedInUser }


        case ADD_TODO_TO_ACTIVITIES:
            return {
                ...state,
                activities: [...state.activities, cmd.todo]
            }

        case REMOVE_TODO_FROM_ACTIVITIES:
            const shoppingCart = state.activities.filter(activity => activity.id !== cmd.activityId)
            return { ...state, activities }

        default:
            return state

    }
}
