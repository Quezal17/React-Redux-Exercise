import React from 'react';
import { increment, decrement } from '../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';

export default function Counter() {
    const counter = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch();
    return (
        <div>
            <h3>Counter: {counter}</h3>
            <button onClick={() => dispatch(increment(1))}>+</button>
            <button onClick={() => dispatch(decrement(1))}>-</button>
        </div>
    );
}