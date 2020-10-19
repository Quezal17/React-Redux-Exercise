import React, { createRef } from 'react';
import Chart from 'chart.js';
import { DiagramProps } from '../PropsInterfaces/PropsInterfaces';
import 'chartjs-chart-error-bars';

let myLineChart: Chart;

interface IData {
    x: number,
    y: number
}

export default class Diagram extends React.PureComponent<DiagramProps> {

    chartRef = createRef<HTMLCanvasElement>();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current;

        if (myChartRef) {
            const { datasetName, axisXName, axisYName, Regr, confidMin, confidMax, x, y, maxY } = this.props;

            let values: IData[] = [];
            let obj: IData;
            for (let i = 0; i < x.length; i++) {
                obj = {
                    x: x[i],
                    y: y[i]
                }
                values.push(obj);
            }
            console.log(values);
            if (typeof myLineChart !== "undefined") myLineChart.destroy();

            myLineChart = new Chart(myChartRef, {
                type: "scatter",
                data: {
                    datasets: [
                        {
                            data: values,
                            pointBackgroundColor: "#8A2BE2",
                            borderColor: "#8A2BE2",
                            fill: false,
                            showLine: false,
                            pointRadius: 6,
                            pointHoverRadius: 6,
                            order: 1
                        }, {
                            data: [
                                {
                                    x: Regr[0],
                                    y: Regr[1]
                                },
                                {
                                    x: Regr[2],
                                    y: Regr[3]
                                }
                            ],
                            fill: false,
                            showLine: true,
                            borderColor: "#FFA500",
                            borderDash: [10, 10],
                            pointRadius: 0,
                            order: 2
                        },
                        {
                            data: [
                                {
                                    x: confidMin[0],
                                    y: confidMin[1]
                                },
                                {
                                    x: confidMin[2],
                                    y: confidMin[3]
                                }
                            ],
                            fill: false,
                            showLine: true,
                            borderColor: "#8F8F8F",
                            pointRadius: 0,
                            order: 3
                        },
                        {
                            data: [
                                {
                                    x: confidMax[0],
                                    y: confidMax[1]
                                },
                                {
                                    x: confidMax[2],
                                    y: confidMax[3]
                                }
                            ],
                            fill: false,
                            showLine: true,
                            borderColor: "#8F8F8F",
                            pointRadius: 0,
                            order: 4
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: axisYName,
                                fontFamily: "sans-serif",
                                fontSize: 18,
                                fontStyle: "bold"
                            },
                            ticks: {
                                fontFamily: "sans-serif",
                                fontSize: 18,
                                max: Math.round(maxY)
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: axisXName,
                                fontFamily: "sans-serif",
                                fontSize: 18,
                                fontStyle: "bold"
                            },
                            ticks: {
                                fontFamily: "sans-serif",
                                fontSize: 18
                            }
                        }]
                    },
                    animation: {
                        duration: 0
                    },
                    title: {
                        display: true,
                        text: datasetName,
                        fontFamily: "sans-serif",
                        fontSize: 22,
                        fontStyle: "bold",
                        fontColor: "#FF0000"
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    tooltips: {
                        displayColors: false,
                        mode: 'x',
                        callbacks: {
                            title: function (tooltipItem) {
                                return "X: " + tooltipItem[0].xLabel;
                            },
                            label: function (tooltipItem) {
                                return 'Y: ' + tooltipItem.value;
                            }
                        }
                    }
                }
            }
            );
        }
    }

    render() {
        return (
            <div className="main-Diagram">
                <canvas
                    className="img-fluid"
                    id="myChart"
                    ref={this.chartRef}
                    aria-label="Regressione Lineare"
                    role="img"
                />
            </div>
        );
    }
}