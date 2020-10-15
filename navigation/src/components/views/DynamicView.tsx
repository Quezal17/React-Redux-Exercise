import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { id: string };

export class DynamicView extends React.Component<RouteComponentProps<TParams>> {
    render() {
        return (
            <div>
                <h1>Dynamic View</h1>
                <p>id: {this.props.match.params.id}</p>
            </div>
        );
    }
}