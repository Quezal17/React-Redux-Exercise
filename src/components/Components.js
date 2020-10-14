import React from 'react';

export class LabelInput extends React.Component {
    render() {
        return (
                <div className="col input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{this.props.stringa}</span>
                    </div>
                    <input type={this.props.tipo} className="form-control" id={this.props.id} onChange={this.props.onChange} value={this.props.value}></input>
                </div>
        );
    }
}

export class Bottone extends React.Component {
    render() {
        return (
            <div className={"col "+this.props.name}>
                <button className={this.props.classe} onClick={this.props.onClick}>{this.props.stringa}</button>
            </div>
        );
    }
}

export class Titoletto extends React.Component {
    render() {
        return (
                <div className="col Titoletto">
                    <label>{this.props.stringa}</label>
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
                        <span className="input-group-text">{this.props.stringa}</span>
                    </div>
                    <label className="form-control">{this.props.result.toString()}</label>
                </div>

            </div>
        );
    }
}