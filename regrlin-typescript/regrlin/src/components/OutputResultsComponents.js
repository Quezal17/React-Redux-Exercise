import React from 'react';
import i18next from 'i18next';
import { LabelResult, SecondaryTitle, Button, LabelInput } from './Components.js';
import Counter from './Counter';

export default class Results extends React.Component {
    renderLabelResult(val, r) {
        return (
            <LabelResult
                word={val}
                result={r.toString()}
            />
        );
    }

    renderSecondaryTitle(val) {
        return (
            <SecondaryTitle
                word={val}
            />
        );
    }

    renderButton(val, action, name, css) {
        return (
            <Button
                word={val}
                onClick={action}
                classe={css}
                name={name}
            />
        );
    }

    renderInputLabel(word, id, type, value, event) {
        return (
            <LabelInput
                word={word}
                type={type}
                id={id}
                value={value}
                onChange={event}
            />
        );
    }

    render() {
        let coeffM = Number(this.props.coeffM);
        coeffM = coeffM.toFixed(3);
        let coeffQ = Number(this.props.coeffQ);
        coeffQ = coeffQ.toFixed(3);
        let covarianza = Number(this.props.covarianza);
        covarianza = covarianza.toFixed(3);
        let pearson = Number(this.props.pearson);
        pearson = pearson.toFixed(3);
        let qMin = Number(this.props.qMin);
        qMin = qMin.toFixed(3);
        let qMax = Number(this.props.qMax);
        qMax = qMax.toFixed(3);
        let mMin = Number(this.props.mMin);
        mMin = mMin.toFixed(3);
        let mMax = Number(this.props.mMax);
        mMax = mMax.toFixed(3);
        let resultEstimateX = this.props.resultX;
        let resultEstimateY = this.props.resultY;
        let result = '';
        if (resultEstimateX.length > 0)
            result = "x: [" + Number(resultEstimateX[0]).toFixed(3) + " , " + Number(resultEstimateX[1]).toFixed(3) + "]";
        else if (resultEstimateY.length > 0)
            result = "y: [" + Number(resultEstimateY[0]).toFixed(3) + " , " + Number(resultEstimateY[1]).toFixed(3) + "]";

        return (
            <div className="main-Results">
                <div className="row">
                    <div className="col equation">
                        <label>{i18next.t('lineEquationTag')}: <strong>y = m x + q</strong></label>
                    </div>
                </div>
                <div className="row">
                    {this.renderLabelResult(i18next.t('mCoefficientTag'), coeffM)}
                    {this.renderLabelResult(i18next.t('qCoefficientTag'), coeffQ)}
                </div>
                <div className="row">
                    {this.renderLabelResult(i18next.t('covarianceTag'), covarianza)}
                    {this.renderLabelResult(i18next.t('pearsonCoefficient'), pearson)}
                </div>
                <div className="row">
                    {this.renderSecondaryTitle(i18next.t('confidenceIntervalTitle'))}
                    {this.renderSecondaryTitle(i18next.t('estimatedValuesTitle'))}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            m: [{mMin} , {mMax}]
                        </span>
                    </div>
                    <div className="col"></div>
                    {this.renderInputLabel("X", "EstimateX", "number", this.props.valueX, this.props.onChangeEstimateX)}
                    {this.renderInputLabel("Y", "EstimateY", "number", this.props.valueY, this.props.onChangeEstimateY)}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            q: [{qMin} , {qMax}]
                        </span>
                    </div>
                    <div className="col"></div>
                    {this.renderButton(i18next.t('estimateButtonText'), () => this.props.onClick(), "EstimateButton", "btn btn-info")}
                    <div className="col">
                        <span>
                            {result}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <Counter/>
                </div>
            </div>
        );
    }
}