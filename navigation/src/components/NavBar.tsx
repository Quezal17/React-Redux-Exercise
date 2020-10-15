import React from 'react';
import { Link } from 'react-router-dom';

const Separator = () => <span> &middot; </span>;

export default class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Link to='/'>First</Link>
                <Separator/>
                <Link to='/second'>Second</Link>
                <Separator/>
                <Link to='/third'>Third</Link>
            </div>
        );
    }
}