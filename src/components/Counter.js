import React from 'react';
import { increment } from '../actions/increment';
import { decrement } from '../actions/decrement';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
    const counter = useSelector(storeState => storeState.counter);
    const dispatch = useDispatch();
    return (
        <div>
            <h3>Counter: {counter}</h3>
            <button onClick={() => dispatch(increment(1))}>+</button>
            <button onClick={() => dispatch(decrement(1))}>-</button>
        </div>
    );
}

export default Counter;