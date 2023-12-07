export interface Params {
    tag: string;
    className?: string[];
    id?: string;
    content?: string;
    callback?: (e?: Event) => void;
    domEvent?: string;
}

export interface SVGParams {
    className: string[];
    id: string;
    color: string;
}

export interface QueryOption {
    key: string;
    value: number | string;
}

export interface Car {
    name: string;
    color: string;
    id?: number;
}

export interface CarRequest {
    name: string;
    color: string;
}

export interface WinnerResp {
    id: number;
    wins: number;
    time: number;
}

export interface Wins {
    name: string;
    wins: number;
    time: number;
    color: string;
    id: number;
}

export interface WinnerRequest {
    wins: number;
    time: number;
}

export type WinnerCar = [number, number];

export type PageNavigation = '+' | '-';

export type WinnersSort = 'id' | 'wins' | 'time';

export type Order = 'ASC' | 'DESC';

type CarNameKeys = 'brand' | 'model';

export type CarName = Record<CarNameKeys, string[]>;

type HeaderKeys = 'header' | 'nav' | 'garage' | 'winners';

export type HeaderParam = Record<HeaderKeys, Params>;

type GarageKeys =
    | 'garage'
    | 'forms'
    | 'createForm'
    | 'updateForm'
    | 'textIputCreate'
    | 'colorInputCreate'
    | 'textIputUpdate'
    | 'colorInputUpdate'
    | 'createBtn'
    | 'updateBtn'
    | 'controls'
    | 'raceBtn'
    | 'resetBtn'
    | 'generateCarsBtn'
    | 'title'
    | 'countCars'
    | 'pageNumber'
    | 'countPage'
    | 'carsWrapper'
    | 'nav'
    | 'prev'
    | 'next';

export type GarageParam = Record<GarageKeys, Params>;

type WinnersKeys =
    | 'winners'
    | 'title'
    | 'countWinners'
    | 'pageNumber'
    | 'countPage'
    | 'winnersTd'
    | 'nav'
    | 'prev'
    | 'next';

export type WinnersParam = Record<WinnersKeys, Params>;

type TrackKeys = 'track' | 'tackNav' | 'select' | 'remove' | 'name' | 'run' | 'back' | 'road' | 'roadConteiner';

export type TrackParam = Record<TrackKeys, Params>;
