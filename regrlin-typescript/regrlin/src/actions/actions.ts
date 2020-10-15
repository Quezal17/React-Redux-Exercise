import { INCREMENT, DECREMENT, ActionTypes } from './types';

export function increment(number: number): ActionTypes {
  return {
    type: INCREMENT,
    payload: number
  }
}

export function decrement(number: number): ActionTypes {
    return {
        type: DECREMENT,
        payload: number
      }
}