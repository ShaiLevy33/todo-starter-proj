import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { REMOVE_CAR_FROM_CART, REMOVE_TODO_FROM_ACTIVITIES } from '../store/reducers/todo.reducer.js'
import { SET_USER_SCORE } from '../store/reducers/user.reducer.js'
import { checkout } from '../store/actions/user.actions.js'

const { useSelector, useDispatch } = ReactRedux

export function UserBalance({ isBalanceShown})
{

        // DONE: get from storeState
        const activities = useSelector(storeState => storeState.todoModule.activities)
        const dispatch = useDispatch()
            // TODO: get from storeState
        const user = userService.getLoggedinUser()

        function removeFromActivities(activityId) {
            // console.log('REMOVE_CAR_FROM_CART:', REMOVE_CAR_FROM_CART)
            console.log(`Todo: remove: ${activityId} from the blance`)
            dispatch({ type: REMOVE_TODO_FROM_ACTIVITIES, activityId })
    
        }
    
        function getBalanceTotal() {
            return activities.reduce((acc, activity) => acc + activity.balance, 0)
        }




}
