import React from 'react';
import './css/components.css';
import Results from './OutputResultsComponents.js';
import Diagramma from './Diagramma.js';
import i18next from 'i18next';

import { Bottone, Titoletto, LabelInput } from './Components.js';

export default class RegrLin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datasetName: '',
            asseXName: '',
            asseYName: '',
            valori: [],
            x: [],
            y: [],
            Regr: [],
            stimaX: '',
            stimaY: '',
            stimaXResult: [],
            stimaYResult: [],
            mediaX: '',
            mediaY: '',
            varianzaX: '',
            varianzaY: '',
            devstdX: '',
            devstdY: '',
            covarianza: '',
            pearson: '',
            coeffM: '',
            coeffQ: '',
            quantile: '',
            mMin: '',
            mMax: '',
            qMin: '',
            qMax: '',
            confidMin: [],
            confidMax: [],
            maxY: 100,
            alfa: 0.05
        };
    }

    checkValori() {
        const { valori, alfa } = this.state;
        if (valori.length < 3 || alfa === '' || alfa < 0 || alfa > 1)
            return false;
        for (let i = 0; i < valori.length; i++) {
            if (valori[i].assex === '' || valori[i].assey === '')
                return false;
        }
        return true;
    }

    onClickCalcola() {
        if (this.checkValori()) {
            const { valori } = this.state;
            let x = [];
            let y = [];

            for (let i = 0; i < valori.length; i++) {
                x[i] = Number(valori[i].x);
                y[i] = Number(valori[i].y);
            }

            this.setState({
                x: x,
                y: y,
                stimaX: '',
                stimaY: '',
                stimaXResult: [],
                stimaYResult: [],
            }, () => { this.calcolaMediaX() })
        }
    }

    onClickReset() {
        this.setState({
            datasetName: '',
            asseXName: '',
            asseYName: '',
            valori: [],
            x: [],
            y: [],
            Regr: [],
            stimaX: '',
            stimaY: '',
            stimaXResult: [],
            stimaYResult: [],
            mediaX: '',
            mediaY: '',
            varianzaX: '',
            varianzaY: '',
            devstdX: '',
            devstdY: '',
            covarianza: '',
            pearson: '',
            coeffM: '',
            coeffQ: '',
            quantile: '',
            mMin: '',
            mMax: '',
            qMin: '',
            qMax: '',
            confidMin: [],
            confidMax: [],
            maxY: 100,
            alfa: 0.05
        })
    }

    onClickStima() {
        const { stimaX, stimaY } = this.state;
        if (stimaX !== '')
            this.setStimaY();
        else if (stimaY !== '')
            this.setStimaX();
    }

    setStimaX() {
        const { stimaY, mMin, mMax, qMin, qMax } = this.state;
        let x = [];
        x[0] = (stimaY - qMin) / mMin;
        x[1] = (stimaY - qMax) / mMax;
        this.setState({
            stimaXResult: x,
            stimaYResult: []
        })
    }

    setStimaY() {
        const { stimaX, mMin, mMax, qMin, qMax } = this.state;
        let y = [];
        y[0] = mMin * stimaX + qMin;
        y[1] = mMax * stimaX + qMax;
        this.setState({
            stimaXResult: [],
            stimaYResult: y
        })
    }

    onClickAggiungi() {
        const { valori } = this.state;
        this.setState({
            valori: [...valori, { x: "", y: "" }]
        })
    }

    onClickRimuovi(index) {
        const { valori } = this.state;
        valori.splice(index, 1);
        this.setState({
            valori: valori
        })
    }

    onChangeInputX(e, index) {
        const { valori } = this.state;
        valori[index]["x"] = e.target.value;
        this.setState({
            valori: valori
        })
    }

    onChangeInputY(e, index) {
        const { valori } = this.state;
        valori[index]["y"] = e.target.value;
        this.setState({
            valori: valori
        })
    }

    onChangeDatasetName(e) {
        let datasetName = e.target.value;
        this.setState({
            datasetName: datasetName
        })
    }

    onChangeAsseXName(e) {
        let asseXName = e.target.value;
        this.setState({
            asseXName: asseXName
        })
    }

    onChangeAsseYName(e) {
        let asseYName = e.target.value;
        this.setState({
            asseYName: asseYName
        })
    }

    onChangeAlfa(e) {
        let alfa = e.target.value;
        this.setState({ alfa: alfa })
    }

    onChangeStimaX(e) {
        let stimaX = e.target.value;
        this.setState({
            stimaX: stimaX,
            stimaY: '',
            stimaXResult: [],
            stimaYResult: []
        })
    }

    onChangeStimaY(e) {
        let stimaY = e.target.value;
        this.setState({
            stimaX: '',
            stimaY: stimaY,
            stimaXResult: [],
            stimaYResult: []
        })
    }

    calcolaMediaX() {
        const { x } = this.state;
        let n = x.length;
        let media = 0;
        for (let i = 0; i < n; i++) {
            media += x[i];
        }
        media /= n;
        this.setState({
            mediaX: media
        }, () => { this.calcolaMediaY() })
    }

    calcolaMediaY() {
        const { y } = this.state;
        let n = y.length;
        let media = 0;
        for (let i = 0; i < n; i++) {
            media += y[i];
        }
        media /= n;
        this.setState({
            mediaY: media
        }, () => { this.calcolaCovarianza() })
    }

    calcolaCovarianza() {
        const { x, y, mediaX, mediaY } = this.state;
        let n = x.length;
        let sommatore = 0;
        for (let i = 0; i < n; i++) {
            sommatore += (x[i] - mediaX) * (y[i] - mediaY);
        }
        sommatore /= n;
        this.setState({
            covarianza: sommatore
        }, () => { this.calcolaVarianzaX() })
    }

    calcolaVarianzaX() {
        const { x } = this.state;
        let sommatore = this.calcolaSommatoriaVarianzaX();
        sommatore /= x.length;
        this.setState({
            varianzaX: sommatore
        }, () => { this.calcolaVarianzaY() })
    }

    calcolaVarianzaY() {
        const { y, mediaY } = this.state;
        let n = y.length;
        let sommatore = 0;
        for (let i = 0; i < n; i++) {
            sommatore += Math.pow((y[i] - mediaY), 2);
        }
        sommatore /= n;
        this.setState({
            varianzaY: sommatore
        }, () => { this.calcolaDevstdX() })
    }

    calcolaDevstdX() {
        const { varianzaX } = this.state;
        let devstd = Math.sqrt(varianzaX);
        this.setState({
            devstdX: devstd
        }, () => { this.calcolaDevstdY() })
    }

    calcolaDevstdY() {
        const { varianzaY } = this.state;
        let devstd = Math.sqrt(varianzaY);
        this.setState({
            devstdY: devstd
        }, () => { this.calcolaPearson() })
    }

    calcolaPearson() {
        const { covarianza, devstdX, devstdY } = this.state;
        let pearson = covarianza / (devstdX * devstdY);
        this.setState({
            pearson: pearson
        }, () => { this.calcolaCoeffM() })
    }

    calcolaCoeffM() {
        const { covarianza, varianzaX } = this.state;
        let m = covarianza / varianzaX;
        this.setState({
            coeffM: m
        }, () => { this.calcolaCoeffQ() })
    }

    calcolaCoeffQ() {
        const { mediaX, mediaY, covarianza, varianzaX } = this.state;
        let q = mediaY - (mediaX * covarianza / varianzaX);
        this.setState({
            coeffQ: q
        }, () => { this.findXMinMax() })
    }

    findXMinMax() {
        const { x } = this.state;
        let min = '';
        let max = '';
        let Regr = [];
        min = x[0];
        max = x[0];
        for (let i = 1; i < x.length; i++)
            if (x[i] < min)
                min = x[i];
            else if (x[i] > max)
                max = x[i];

        Regr[0] = Number(min);
        Regr[1] = this.calcolaStimaY(min);
        Regr[2] = Number(max);
        Regr[3] = this.calcolaStimaY(max);
        this.setState({
            Regr: Regr
        }, () => { this.calcolaQuantile() })
    }

    calcolaQuantile() {
        const { x, alfa } = this.state;
        var { jStat } = require('jstat');
        var ordine = 1 - (alfa / 2);
        var r = jStat.studentt.inv(ordine, x.length - 2);
        this.setState({
            quantile: r
        }, () => { this.calcolaIntervallo() })
    }

    calcolaIntervallo() {
        const { x, quantile, mediaX, coeffM, coeffQ, Regr } = this.state;
        let stimaTemp;
        let confidMin = [];
        let confidMax = [];
        let e, mMin, mMax, qMin, qMax;
        let n = x.length;

        let stimeY = [];
        for (let i = 0; i < n; i++) {
            stimeY[i] = this.calcolaStimaY(x[i]);
        }
        let s2RES = this.calcolaS2RES(stimeY);
        let sumVarX = this.calcolaSommatoriaVarianzaX();

        e = quantile * Math.sqrt(s2RES / sumVarX);
        mMin = coeffM - e;
        mMax = coeffM + e;

        e = quantile * Math.sqrt(s2RES * (1 / n + Math.pow(mediaX, 2) / sumVarX));
        qMin = coeffQ - e;
        qMax = coeffQ + e;

        let max = mMax * x[0] + qMax;
        for (let i = 0; i < n; i++) {
            stimaTemp = mMax * x[i] + qMax;
            if (stimaTemp > max)
                max = stimaTemp;
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

    calcolaStimaY(x) {
        const { coeffM, coeffQ } = this.state;
        return coeffM * x + coeffQ;
    }

    calcolaSommatoriaVarianzaX() {
        const { x, mediaX } = this.state;
        let sommatore = 0;
        for (let i = 0; i < x.length; i++) {
            sommatore += Math.pow((x[i] - mediaX), 2);
        }
        return sommatore;
    }

    calcolaS2RES(stimeY) {
        const { y } = this.state;
        let s2res = 0;
        for (let i = 0; i < y.length; i++) {
            s2res += Math.pow((y[i] - stimeY[i]), 2);
        }
        return s2res / (y.length - 2);
    }

    renderInputLabel(stringa, id, tipo, valore, event) {
        return (
            <div className="row">
                <LabelInput
                    stringa={stringa}
                    tipo={tipo}
                    id={id}
                    value={valore}
                    onChange={event}
                />
            </div>
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

    render() {
        const {
            datasetName, asseXName, asseYName,
            x, y,
            stimaX, stimaY, stimaXResult, stimaYResult,
            covarianza, pearson,
            coeffM, coeffQ,
            valori,
            Regr,
            confidMin,
            confidMax,
            maxY,
            alfa,
            mMin, mMax, qMin, qMax
        } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col rounded-bottom MainTitolo">
                        <h1 className="align-middle">{i18next.t('title')}</h1>
                    </div>
                </div>
                <div className="row RegrLin">
                    <div className="col-3 rounded main-Insert">
                        <div className="row">
                            {this.renderTitoletto(i18next.t('insertDataTitle'))}

                        </div>
                        {this.renderInputLabel(i18next.t('nameDatasetTag'), "dname", "text", datasetName, (e) => this.onChangeDatasetName(e))}
                        {this.renderInputLabel(i18next.t('nameXAxisTag'), "xname", "text", asseXName, (e) => this.onChangeAsseXName(e))}
                        {this.renderInputLabel(i18next.t('nameYAxisTag'), "yname", "text", asseYName, (e) => this.onChangeAsseYName(e))}
                        {this.renderInputLabel(i18next.t('alphaTag'), "alpha", "number", alfa, (e) => this.onChangeAlfa(e))}
                        <div className="row">
                            {this.renderBottone(i18next.t('addValueButtonText'), () => this.onClickAggiungi(), "AggiungiButton", "btn btn-info")}
                        </div>
                        <div className="DynamicPart">
                            {
                                this.state.valori.map((val, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="row">
                                                <LabelInput
                                                    stringa="X"
                                                    tipo="number"
                                                    id={"X" + index}
                                                    value={valori[index].x}
                                                    onChange={(e) => this.onChangeInputX(e, index)}
                                                />
                                                <LabelInput
                                                    stringa="Y"
                                                    tipo="number"
                                                    id={"Y" + index}
                                                    value={valori[index].y}
                                                    onChange={(e) => this.onChangeInputY(e, index)}
                                                />

                                                {this.renderBottone(i18next.t('deleteButtonText'), () => this.onClickRimuovi(index), "RimuoviButton", "btn btn-danger")}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {this.renderBottone(i18next.t('calculateButtonText'), () => this.onClickCalcola(), "CalcolaButton", "btn btn-success")}
                            {this.renderBottone(i18next.t('resetButtonText'), () => this.onClickReset(), "ResetButton", "btn btn-warning")}
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
                            <Diagramma
                                x={x}
                                y={y}
                                datasetName={datasetName}
                                asseXName={asseXName}
                                asseYName={asseYName}
                                Regr={Regr}
                                confidMin={confidMin}
                                confidMax={confidMax}
                                maxY={maxY}
                            />
                        </div>
                        <Results
                            coeffM={coeffM}
                            coeffQ={coeffQ}
                            covarianza={covarianza}
                            pearson={pearson}
                            onClick={() => this.onClickStima()}
                            resultX={stimaXResult}
                            resultY={stimaYResult}
                            valueX={stimaX}
                            valueY={stimaY}
                            mMin={mMin}
                            mMax={mMax}
                            qMin={qMin}
                            qMax={qMax}
                            onChangeStimaX={(e) => this.onChangeStimaX(e)}
                            onChangeStimaY={(e) => this.onChangeStimaY(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

