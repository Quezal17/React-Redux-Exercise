import { ChangeEvent } from "react";

export interface LabelInputProps {
    word: string;
    type: string;
    id: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} 

export interface ButtonProps {
    word: string;
    name: string;
    classe: string;
    onClick: () => void;
}

export interface SecondaryTitleProps {
    word: string;
}

export interface LabelResultProps {
    word: string;
    result: string;
}

export interface ResultsProps {
    coeffM: number;
    coeffQ: number;
    covariance: number;
    pearson: number;
    qMin: number;
    qMax: number;
    mMin: number;
    mMax: number;
    resultX: number[];
    resultY: number[];
    valueX: number;
    valueY: number;
    onChangeEstimateX: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeEstimateY: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export interface ValueState {
    x: string;
    y: string;
}

export interface IState {
    datasetName: string;
    axisXName: string;
    axisYName: string;
    values: ValueState[];
    x: number[];
    y: number[];
    Regr: number[];
    estimateX: string;
    estimateY: string;
    estimateXResult: number[];
    estimateYResult: number[];
    averageX: number;
    averageY: number;
    varianceX: number;
    varianceY: number;
    devstdX: number;
    devstdY: number;
    covariance: number;
    pearson: number;
    coeffM: number;
    coeffQ: number;
    quantile: number;
    mMin: number;
    mMax: number;
    qMin: number;
    qMax: number;
    confidMin: number[];
    confidMax: number[];
    maxY: number;
    alpha: string;
}

export interface DiagramProps {
    datasetName: string;
    axisXName: string;
    axisYName: string;
    Regr: number[];
    x: number[];
    y: number[];
    confidMin: number[];
    confidMax: number[];
    maxY: number;
}
