import React, {ChangeEvent} from 'react';
import i18next from 'i18next';
import { LabelResult, SecondaryTitle, Button, LabelInput } from '../Components';
import Counter from '../Counter';
import {ResultsProps} from '../PropsInterfaces/PropsInterfaces';

export default class Results extends React.Component<ResultsProps> {
    
    renderLabelResult(word: string, result: number) {
        return (
            <LabelResult
                word={word}
                result={result.toFixed(3)}
            />
        );
    }

    renderSecondaryTitle(word: string) {
        return (
            <SecondaryTitle
                word={word}
            />
        );
    }

    renderButton(word: string, action: () => void, name: string, css: string) {
        return (
            <Button
                word={word}
                onClick={action}
                classe={css}
                name={name}
            />
        );
    }

    renderInputLabel(word: string, id: string, type: string, value: string | number, event: (e: ChangeEvent<HTMLInputElement>) => void) {
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
                    {this.renderLabelResult(i18next.t('mCoefficientTag'), this.props.coeffM)}
                    {this.renderLabelResult(i18next.t('qCoefficientTag'), this.props.coeffQ)}
                </div>
                <div className="row">
                    {this.renderLabelResult(i18next.t('covarianceTag'), this.props.covariance)}
                    {this.renderLabelResult(i18next.t('pearsonCoefficient'), this.props.pearson)}
                </div>
                <div className="row">
                    {this.renderSecondaryTitle(i18next.t('confidenceIntervalTitle'))}
                    {this.renderSecondaryTitle(i18next.t('estimatedValuesTitle'))}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            m: [{this.props.mMin.toFixed(3)} , {this.props.mMax.toFixed(3)}]
                        </span>
                    </div>
                    <div className="col"></div>
                    {this.renderInputLabel("X", "EstimateX", "number", this.props.valueX, this.props.onChangeEstimateX)}
                    {this.renderInputLabel("Y", "EstimateY", "number", this.props.valueY, this.props.onChangeEstimateY)}
                </div>
                <div className="row">
                    <div className="col">
                        <span>
                            q: [{this.props.qMin.toFixed(3)} , {this.props.qMax.toFixed(3)}]
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