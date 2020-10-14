import React from 'react';

export class LabelInput extends React.Component {
    render() {
        return (
                <div className="col input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{this.props.word}</span>
                    </div>
                    <input type={this.props.type} className="form-control" id={this.props.id} onChange={this.props.onChange} value={this.props.value}></input>
                </div>
        );
    }
}

export class Button extends React.Component {
    render() {
        return (
            <div className={"col "+this.props.name}>
                <button className={this.props.classe} onClick={this.props.onClick}>{this.props.word}</button>
            </div>
        );
    }
}

export class SecondaryTitle extends React.Component {
    render() {
        return (
                <div className="col STitle">
                    <label>{this.props.word}</label>
                </div>
        );
    }
}

export class LabelResult extends React.Component {
    render() {
        return (
            <div className="col LabelResult">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{this.props.word}</span>
                    </div>
                    <label className="form-control">{this.props.result.toString()}</label>
                </div>

            </div>
        );
    }
}