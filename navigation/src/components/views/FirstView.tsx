import React from 'react';

export class FirstView extends React.Component {
    render() {
        return (
            <div>
                <h1>First View</h1>
                <p>Welcome to the main page!</p>
                <a href='/second'>Go to the second view</a>
            </div>
        );
    }
}