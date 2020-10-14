import React from 'react';
import i18next from 'i18next';
import { LabelResult, Titoletto, Bottone, LabelInput } from './Components.js';

export default class Results extends React.Component {
    renderLabelResult(val, r) {
        return (
            <LabelResult
                stringa={val}
                result={r.toString()}
            />
        );
    }

    renderTitoletto(val) {
        return (
            <Titoletto
                stringa={val}
            />
        );
    }

    renderBottone(val, azione, name, css) {
        return (
            <Bottone
                stringa={val}
                onClick={azione}
                classe={css}
                name={name}
            />
        );
    }

    renderInputLabel(stringa, id, tipo, valore, evento) {
        return (
            <LabelInput
                stringa={stringa}
                tipo={tipo}
                id={id}
                value={valore}
                onChange={evento}
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
        let resultStimaX = this.props.resultX;
        let resultStimaY = this.props.resultY;
        let result = '';
        if (resultStimaX.length > 0)
            result = "x: [" + Number(resultStimaX[0]).toFixed(3) + " , " + Number(resultStimaX[1]).toFixed(3) + "]";
        else if (resultStimaY.length > 0)
            result = "y: [" + Number(resultStimaY[0]).toFixed(3) + " , " + Number(resultStimaY[1]).toFixed(3) + "]";

        return (
            <div className="main-Results">
                <div className="row">
                    <div className="col equazione">
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
                    {this.renderTitoletto(i18next.t('confidenceIntervalTitle'))}
                    {this.renderTitoletto(i18next.t('estimatedValuesTitle'))}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            m: [{mMin} , {mMax}]
                        </span>
                    </div>
                    <div className="col"></div>
                    {this.renderInputLabel("X", "stimaX", "number", this.props.valueX, this.props.onChangeStimaX)}
                    {this.renderInputLabel("Y", "stimaY", "number", this.props.valueY, this.props.onChangeStimaY)}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            q: [{qMin} , {qMax}]
                        </span>
                    </div>
                    <div className="col"></div>
                    {this.renderBottone(i18next.t('estimateButtonText'), () => this.props.onClick(), "StimaButton", "btn btn-info")}
                    <div className="col">
                        <span>
                            {result}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}