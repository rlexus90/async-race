import { CarName } from './types/index';

export const BASE_URL = 'http://127.0.0.1:3000';

export const CAR_PER_PAGE = 7;

export const WINNERS_PER_PAGE = 10;

export const NCars = 100;

export const RACE_TIME = 60000; //ms

export const CAR_NAME: CarName = {
    brand: [
        'Tesla',
        'BMW',
        'Mersedes',
        'Toyota',
        'Chevrolet',
        'Ferrari',
        'KIA',
        'Volvo',
        'Mazda',
        'Maserati',
        'Lexus',
        'Honda',
    ],
    model: [
        'Civic',
        'Accord',
        'Model S',
        'Model X',
        'M3',
        'Yaris',
        'Camry',
        'Prius',
        '812superfast ',
        '812 GTS',
        'Spark',
        'Cobalt',
        'Camaro',
    ],
};
