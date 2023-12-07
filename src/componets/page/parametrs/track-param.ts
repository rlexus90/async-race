import { TrackParam } from '../../../types/index';

export const PARAMS: TrackParam = {
    track: {
        tag: 'div',
        className: ['track'],
    },
    tackNav: {
        tag: 'div',
        className: ['track-nav'],
    },
    select: {
        tag: 'button',
        className: ['btn', 'select'],
        content: 'SELECT',
    },
    remove: {
        tag: 'button',
        className: ['btn', 'remove'],
        content: 'REMOVE',
    },
    name: {
        tag: 'p',
        className: ['car-name'],
    },
    run: {
        tag: 'div',
        className: ['run-btn'],
        content: 'A',
    },
    back: {
        tag: 'div',
        className: ['back-btn', 'blocked'],
        content: 'B',
    },
    road: {
        tag: 'div',
        className: ['road'],
    },
    roadConteiner: {
        tag: 'div',
        className: ['road-container'],
    },
};
