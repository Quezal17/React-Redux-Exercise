export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

interface IncrementAction {
  type: typeof INCREMENT
  payload: number
}

interface DecrementAction {
  type: typeof DECREMENT
  payload: number
}

export type ActionTypes = IncrementAction | DecrementAction