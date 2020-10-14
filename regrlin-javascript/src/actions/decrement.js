export const decrement = (number) => {
    return {
        type: 'DECREMENT',
        payload: number
    }
}