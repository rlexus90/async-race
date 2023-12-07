import { GarageParam } from '../../../types/index';

export const PARAMS: GarageParam = {
    garage: {
        tag: 'div',
        className: ['garage'],
    },
    forms: {
        tag: 'div',
        className: ['forms'],
    },
    createForm: {
        tag: 'div',
        className: ['form-create'],
    },
    updateForm: {
        tag: 'div',
        className: ['form-update'],
    },
    textIputCreate: {
        tag: 'input',
        className: ['inner-text'],
        id: 'text-create',
    },
    colorInputCreate: {
        tag: 'input',
        className: ['inner-color'],
        id: 'color-create',
    },
    textIputUpdate: {
        tag: 'input',
        className: ['inner-text'],
        id: 'text-update',
    },
    colorInputUpdate: {
        tag: 'input',
        className: ['inner-color'],
        id: 'color-update',
    },
    createBtn: {
        tag: 'button',
        content: 'Create',
        className: ['btn', 'create-btn'],
    },
    updateBtn: {
        tag: 'button',
        content: 'Update',
        className: ['btn', 'update-btn'],
    },
    controls: {
        tag: 'div',
        className: ['controls'],
    },
    raceBtn: {
        tag: 'button',
        content: 'Race',
        className: ['btn', 'race-btn'],
    },
    resetBtn: {
        tag: 'button',
        content: 'Reset',
        className: ['btn', 'reset-btn'],
        domEvent: 'click',
        callback: () => null,
    },
    generateCarsBtn: {
        tag: 'button',
        content: 'Generate',
        className: ['btn', 'generate-btn'],
        domEvent: 'click',
        callback: () => null,
    },
    title: {
        tag: 'h2',
        className: ['title'],
        content: 'Garage',
    },
    countCars: {
        tag: 'span',
        className: ['count-cars'],
    },
    pageNumber: {
        tag: 'p',
        className: ['page-number'],
        content: 'Page #',
    },
    countPage: {
        tag: 'span',
        className: ['count-page-garage'],
    },
    carsWrapper: {
        tag: 'div',
        className: ['cars-wrapper'],
    },
    nav: {
        tag: 'nav',
        className: ['garage-nav'],
    },
    prev: {
        tag: 'button',
        content: 'Prev page',
        className: ['btn', 'garage-prev'],
    },
    next: {
        tag: 'button',
        content: 'Next page',
        className: ['btn', 'garage-next'],
    },
};
