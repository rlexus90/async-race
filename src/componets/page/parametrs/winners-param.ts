import { WinnersParam } from '../../../types/index';

export const PARAMS: WinnersParam = {
    winners: {
        tag: 'div',
        className: ['winners'],
    },
    title: {
        tag: 'h2',
        className: ['title'],
        content: 'Winners',
    },
    countWinners: {
        tag: 'span',
        className: ['count-winners'],
    },
    pageNumber: {
        tag: 'p',
        className: ['page-number'],
        content: 'Page #',
    },
    countPage: {
        tag: 'span',
        className: ['count-page-winners'],
    },
    winnersTd: {
        tag: 'div',
        className: ['winners-td'],
    },
    nav: {
        tag: 'nav',
        className: ['winners-nav'],
    },
    prev: {
        tag: 'button',
        content: 'Prev page',
        className: ['btn', 'winners-prev'],
    },
    next: {
        tag: 'button',
        content: 'Next page',
        className: ['btn', 'winners-next'],
    },
};
