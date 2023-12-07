import { HeaderParam } from '../../../types/index';

export const PARAMS: HeaderParam = {
    header: {
        tag: 'header',
    },
    nav: {
        tag: 'nav',
        className: ['app-nav'],
    },
    garage: {
        tag: 'button',
        className: ['garage-btn', 'btn'],
        content: 'To Garage',
    },
    winners: {
        tag: 'button',
        className: ['winners-btn', 'btn'],
        content: 'To Winners',
    },
};
