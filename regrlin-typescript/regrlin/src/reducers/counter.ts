import { INCREMENT, DECREMENT, ActionTypes } from '../actions/types'

export default function counterReducer(state = 0, action: ActionTypes): number {
    switch (action.type) {
        case INCREMENT:
            return state + action.payload;
        case DECREMENT:
            return state - action.payload;
        default:
            return state;
    }
}