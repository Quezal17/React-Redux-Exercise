import React, { ChangeEvent } from 'react';
import './css/components.css';
import Results from './OutputResults/OutputResults';
import Diagram from './Diagram/Diagram';
import i18next from 'i18next';
import { Button, SecondaryTitle, LabelInput } from './Components';
import {IState} from './PropsInterfaces/PropsInterfaces';

interface IProps {}

export default class RegrLin extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = this.getInitState();
    }

    getInitState() {
        return {
            datasetName: '',
            axisXName: '',
            axisYName: '',
            values: [],
            x: [],
            y: [],
            Regr: [],
            estimateX: '',
            estimateY: '',
            estimateXResult: [],
            estimateYResult: [],
            averageX: 0,
            averageY: 0,
            varianceX: 0,
            varianceY: 0,
            devstdX: 0,
            devstdY: 0,
            covariance: 0,
            pearson: 0,
            coeffM: 0,
            coeffQ: 0,
            quantile: 0,
            mMin: 0,
            mMax: 0,
            qMin: 0,
            qMax: 0,
            confidMin: [],
            confidMax: [],
            maxY: 100,
            alpha: '0.05'
        };
    }

    checkValues() {
        const { values, alpha } = this.state;
        if (values.length < 3 || alpha === '' || parseFloat(alpha) < 0 || parseFloat(alpha) > 1)
            return false;
        for (let i = 0; i < values.length; i++) {
            if (values[i].x === '' || values[i].y === '')
                return false;
        }
        return true;
    }

    onClickCalculate() {
        if (this.checkValues()) {
            const { values } = this.state;
            let x = [];
            let y = [];

            for (let i = 0; i < values.length; i++) {
                x[i] = Number(values[i].x);
                y[i] = Number(values[i].y);
            }

            this.setState({
                x: x,
                y: y,
                estimateX: '',
                estimateY: '',
                estimateXResult: [],
                estimateYResult: [],
            }, () => { this.calculateAverageX() })
        }
    }

    onClickReset() {
        this.setState(this.getInitState);
    }

    onClickEstimate() {
        const { estimateX, estimateY } = this.state;
        if (estimateX !== undefined)
            this.setEstimateY();
        else if (estimateY !== undefined)
            this.setEstimateX();
    }

    setEstimateX() {
        const { estimateY, mMin, mMax, qMin, qMax } = this.state;
        let x = [];
        x[0] = (parseFloat(estimateY) - qMin) / mMin;
        x[1] = (parseFloat(estimateY) - qMax) / mMax;
        this.setState({
            estimateXResult: x,
            estimateYResult: []
        })
    }

    setEstimateY() {
        const { estimateX, mMin, mMax, qMin, qMax } = this.state;
        let y = [];
        y[0] = mMin * parseFloat(estimateX) + qMin;
        y[1] = mMax * parseFloat(estimateX) + qMax;
        this.setState({
            estimateXResult: [],
            estimateYResult: y
        })
    }

    onClickAdd() {
        const { values } = this.state;
        this.setState({
            values: [...values, { x: '', y: '' }]
        })
    }

    onClickDelete(index: number) {
        const { values } = this.state;
        values.splice(index, 1);
        this.setState({
            values: values
        })
    }

    onChangeInputX(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { values } = this.state;
        values[index].x = e.target.value;
            this.setState({
               values: values
        });
    }

    onChangeInputY(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { values } = this.state;
        values[index].y = e.target.value;
            this.setState({
               values: values
        });
    }

    onChangeDatasetName(e: ChangeEvent<HTMLInputElement>) {
        let datasetName = e.target.value;
        this.setState({
            datasetName: datasetName
        })
    }

    onChangeAxisXName(e: ChangeEvent<HTMLInputElement>) {
        let axisXName = e.target.value;
        this.setState({
            axisXName: axisXName
        })
    }

    onChangeAxisYName(e: ChangeEvent<HTMLInputElement>) {
        let axisYName = e.target.value;
        this.setState({
            axisYName: axisYName
        })
    }

    onChangeAlpha(e: ChangeEvent<HTMLInputElement>) {
        let alpha = e.target.value;
        this.setState({ alpha: alpha })
    }

    onChangeEstimateX(e: ChangeEvent<HTMLInputElement>) {
        let estimateX = e.target.value;
        this.setState({
            estimateX: estimateX,
            estimateY: '',
            estimateXResult: [],
            estimateYResult: []
        })
    }

    onChangeEstimateY(e: ChangeEvent<HTMLInputElement>) {
        let estimateY = e.target.value;
        this.setState({
            estimateX: '',
            estimateY: estimateY,
            estimateXResult: [],
            estimateYResult: []
        })
    }

    calculateAverageX() {
        const { x } = this.state;
        let n = x.length;
        let average = 0;
        for (let i = 0; i < n; i++) {
            average += x[i];
        }
        average /= n;
        this.setState({
            averageX: average
        }, () => { this.calculateAverageY() })
    }

    calculateAverageY() {
        const { y } = this.state;
        let n = y.length;
        let average = 0;
        for (let i = 0; i < n; i++) {
            average += y[i];
        }
        average /= n;
        this.setState({
            averageY: average
        }, () => { this.calculateCovariance() })
    }

    calculateCovariance() {
        const { x, y, averageX, averageY } = this.state;
        let n = x.length;
        let adder = 0;
        for (let i = 0; i < n; i++) {
            adder += (x[i] - averageX) * (y[i] - averageY);
        }
        adder /= n;
        this.setState({
            covariance: adder
        }, () => { this.calculateVarianceX() })
    }

    calculateVarianceX() {
        const { x } = this.state;
        let adder = this.calculateSummationVarianceX();
        adder /= x.length;
        this.setState({
            varianceX: adder
        }, () => { this.calculateVarianceY() })
    }

    calculateVarianceY() {
        const { y, averageY } = this.state;
        let n = y.length;
        let adder = 0;
        for (let i = 0; i < n; i++) {
            adder += Math.pow((y[i] - averageY), 2);
        }
        adder /= n;
        this.setState({
            varianceY: adder
        }, () => { this.calculateDevstdX() })
    }

    calculateDevstdX() {
        const { varianceX } = this.state;
        let devstd = Math.sqrt(varianceX);
        this.setState({
            devstdX: devstd
        }, () => { this.calculateDevstdY() })
    }

    calculateDevstdY() {
        const { varianceY } = this.state;
        let devstd = Math.sqrt(varianceY);
        this.setState({
            devstdY: devstd
        }, () => { this.calculatePearson() })
    }

    calculatePearson() {
        const { covariance, devstdX, devstdY } = this.state;
        let pearson = covariance / (devstdX * devstdY);
        this.setState({
            pearson: pearson
        }, () => { this.calculateCoeffM() })
    }

    calculateCoeffM() {
        const { covariance, varianceX } = this.state;
        let m = covariance / varianceX;
        this.setState({
            coeffM: m
        }, () => { this.calculateCoeffQ() })
    }

    calculateCoeffQ() {
        const { averageX, averageY, covariance, varianceX } = this.state;
        let q = averageY - (averageX * covariance / varianceX);
        this.setState({
            coeffQ: q
        }, () => { this.findXMinMax() })
    }

    findXMinMax() {
        const { x } = this.state;
        let min = x[0];
        let max = x[0];
        let Regr = [];
        for (let i = 1; i < x.length; i++)
            if (x[i] < min)
                min = x[i];
            else if (x[i] > max)
                max = x[i];

        Regr[0] = min;
        Regr[1] = this.calculateEstimateY(min);
        Regr[2] = max;
        Regr[3] = this.calculateEstimateY(max);
        this.setState({
            Regr: Regr
        }, () => { this.calculateQuantile() })
    }

    calculateQuantile() {
        const { x, alpha } = this.state;
        var { jStat } = require('jstat');
        var ordine = 1 - (parseFloat(alpha) / 2);
        var r = jStat.studentt.inv(ordine, x.length - 2);
        this.setState({
            quantile: r
        }, () => { this.calculateInterval() })
    }

    calculateInterval() {
        const { x, quantile, averageX, coeffM, coeffQ, Regr } = this.state;
        let estimateTemp;
        let confidMin = [];
        let confidMax = [];
        let e, mMin, mMax, qMin, qMax;
        let n = x.length;

        let estimatesY = [];
        for (let i = 0; i < n; i++) {
            estimatesY[i] = this.calculateEstimateY(x[i]);
        }
        let s2RES = this.calculateS2RES(estimatesY);
        let sumVarX = this.calculateSummationVarianceX();

        e = quantile * Math.sqrt(s2RES / sumVarX);
        mMin = coeffM - e;
        mMax = coeffM + e;

        e = quantile * Math.sqrt(s2RES * (1 / n + Math.pow(averageX, 2) / sumVarX));
        qMin = coeffQ - e;
        qMax = coeffQ + e;

        let max = mMax * x[0] + qMax;
        for (let i = 0; i < n; i++) {
            estimateTemp = mMax * x[i] + qMax;
            if (estimateTemp > max)
                max = estimateTemp;
        }

        confidMin[0] = Regr[0];
        confidMin[1] = mMin * Regr[0] + qMin;
        confidMin[2] = Regr[2];
        confidMin[3] = mMin * Regr[2] + qMin;

        confidMax[0] = Regr[0];
        confidMax[1] = mMax * Regr[0] + qMax;
        confidMax[2] = Regr[2];
        confidMax[3] = mMax * Regr[2] + qMax;

        this.setState({
            mMin: mMin,
            mMax: mMax,
            qMin: qMin,
            qMax: qMax,
            confidMin: confidMin,
            confidMax: confidMax,
            maxY: max
        })
    }

    calculateEstimateY(x: number) {
        const { coeffM, coeffQ } = this.state;
        return coeffM * x + coeffQ;
    }

    calculateSummationVarianceX() {
        const { x, averageX } = this.state;
        let adder = 0;
        for (let i = 0; i < x.length; i++) {
            adder += Math.pow((x[i] - averageX), 2);
        }
        return adder;
    }

    calculateS2RES(estimatesY: number[]) {
        const { y } = this.state;
        let s2res = 0;
        for (let i = 0; i < y.length; i++) {
            s2res += Math.pow((y[i] - estimatesY[i]), 2);
        }
        return s2res / (y.length - 2);
    }

    renderInputLabel(word: string, id: string, type: string, value: string | number, event: (e: ChangeEvent<HTMLInputElement>) => void) {
        return (
            <div className="row">
                <LabelInput
                    word={word}
                    type={type}
                    id={id}
                    value={value}
                    onChange={event}
                />
            </div>
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

    render() {
        const {
            datasetName, axisXName, axisYName,
            x, y,
            estimateX, estimateY, estimateXResult, estimateYResult,
            covariance, pearson,
            coeffM, coeffQ,
            values,
            Regr,
            confidMin,
            confidMax,
            maxY,
            alpha,
            mMin, mMax, qMin, qMax
        } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col rounded-bottom MainTitle">
                        <h1 className="align-middle">{i18next.t('title')}</h1>
                    </div>
                </div>
                <div className="row RegrLin">
                    <div className="col-3 rounded main-Insert">
                        <div className="row">
                            {this.renderSecondaryTitle(i18next.t('insertDataTitle'))}

                        </div>
                        {this.renderInputLabel(i18next.t('nameDatasetTag'), "dname", "text", datasetName, (e) => this.onChangeDatasetName(e))}
                        {this.renderInputLabel(i18next.t('nameXAxisTag'), "xname", "text", axisXName, (e) => this.onChangeAxisXName(e))}
                        {this.renderInputLabel(i18next.t('nameYAxisTag'), "yname", "text", axisYName, (e) => this.onChangeAxisYName(e))}
                        {this.renderInputLabel(i18next.t('alphaTag'), "alpha", "number", alpha, (e) => this.onChangeAlpha(e))}
                        <div className="row">
                            {this.renderButton(i18next.t('addValueButtonText'), () => this.onClickAdd(), "AddButton", "btn btn-info")}
                        </div>
                        <div className="DynamicPart">
                            {
                                this.state.values.map((val, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="row">
                                                <LabelInput
                                                    word="X"
                                                    type="number"
                                                    id={"X" + index}
                                                    value={values[index].x}
                                                    onChange={(e) => this.onChangeInputX(e, index)}
                                                />
                                                <LabelInput
                                                    word="Y"
                                                    type="number"
                                                    id={"Y" + index}
                                                    value={values[index].y}
                                                    onChange={(e) => this.onChangeInputY(e, index)}
                                                />

                                                {this.renderButton(i18next.t('deleteButtonText'), () => this.onClickDelete(index), "DeleteButton", "btn btn-danger")}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {this.renderButton(i18next.t('calculateButtonText'), () => this.onClickCalculate(), "CalculateButton", "btn btn-success")}
                            {this.renderButton(i18next.t('resetButtonText'), () => this.onClickReset(), "ResetButton", "btn btn-warning")}
                            <div className="col"></div>
                        </div>
                        <div className="row">
                            <div className="warnings">
                                <p>* {i18next.t('insert3ValuesWarning')}</p>
                                <p>* {i18next.t('alphaWarning')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-7  justify-content-md-center rounded">
                        <div className="row">
                            <Diagram
                                x={x}
                                y={y}
                                datasetName={datasetName}
                                axisXName={axisXName}
                                axisYName={axisYName}
                                Regr={Regr}
                                confidMin={confidMin}
                                confidMax={confidMax}
                                maxY={maxY}
                            />
                        </div>
                        <Results
                            coeffM={coeffM}
                            coeffQ={coeffQ}
                            covariance={covariance}
                            pearson={pearson}
                            onClick={() => this.onClickEstimate()}
                            resultX={estimateXResult}
                            resultY={estimateYResult}
                            valueX={parseFloat(estimateX)}
                            valueY={parseFloat(estimateY)}
                            mMin={mMin}
                            mMax={mMax}
                            qMin={qMin}
                            qMax={qMax}
                            onChangeEstimateX={(e) => this.onChangeEstimateX(e)}
                            onChangeEstimateY={(e) => this.onChangeEstimateY(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

