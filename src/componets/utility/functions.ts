import { CAR_NAME, NCars } from '../../constants';
import { Car, CarName, QueryOption } from '../../types/index';

export function qeuryString(option: QueryOption[]) {
    const query = option.length ? '?' + option.map((e) => `${e.key}=${e.value}`).join('&') : '';
    return query;
}

export function errorUpdate() {
    const update = document.querySelector('.update-btn');
    if (update) {
        update.classList.add('error');
        setTimeout(() => update.classList.remove('error'), 1000);
    }
}

export function randomCars() {
    const cars: Car[] = [];
    for (let i = 1; i <= NCars; i += 1) {
        const car: Car = {
            name: `${randomName(CAR_NAME)}`,
            color: `${randomColor()}`,
        };
        cars.push(car);
    }
    return cars;
}

function randomName(obj: CarName) {
    const numBrends = obj.brand.length - 1;
    const numModels = obj.model.length - 1;
    const brand = Math.round(Math.random() * numBrends);
    const model = Math.round(Math.random() * numModels);
    return `${obj.brand[brand]} ${obj.model[model]}`;
}

function randomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
