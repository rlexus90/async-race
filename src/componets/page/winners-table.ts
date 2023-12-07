import { WINNERS_PER_PAGE } from '../../constants';
import { PageNavigation, SVGParams, WinnerResp, Wins } from '../../types/index';
import { ServerRequest } from '../server-request';
import ElementCreator from '../utility/elem-creator';
import { SvgElementCreator } from '../utility/svg-elem-creator';

export class WinnerTable {
    private serverRequest: ServerRequest;
    private currentWinnerPage: number;
    private table!: HTMLTableElement;

    constructor(serverRequest: ServerRequest) {
        this.serverRequest = serverRequest;
        this.currentWinnerPage = 1;
        this.createHeader();
        this.getWinnerPage();
        this.choosePage();
        const prew = document.querySelector('.winners-prev');
        prew?.addEventListener('click', () => this.choosePage('-'));
        const next = document.querySelector('.winners-next');
        next?.addEventListener('click', () => this.choosePage('+'));
    }

    public async getWinnerPage() {
        this.clearTd();
        const winReqv = await this.serverRequest.getWinners(this.currentWinnerPage);
        const winProm = winReqv.map(async (el: WinnerResp) => {
            const car = await this.serverRequest.getCar(el.id);
            const winner: Wins = {
                name: car.name,
                wins: el.wins,
                time: el.time,
                color: car.color,
                id: el.id,
            };
            return winner;
        });
        const winners = await Promise.all(winProm);
        winners.forEach((winner) => this.createLine(winner));
    }

    private clearTd() {
        while (this.table.children.length > 1) {
            this.table.lastChild?.remove();
        }
    }

    public async choosePage(key?: PageNavigation) {
        await this.serverRequest.getWinners();
        const nPages = this.serverRequest.winnersPagesCount ? this.serverRequest.winnersPagesCount : 1;
        let page = this.currentWinnerPage;
        if (key === '+') page += 1;
        if (key === '-') page -= 1;
        if (page === 0) page = 1;
        if (page > nPages) page = nPages;

        if (this.currentWinnerPage !== page) {
            this.currentWinnerPage = page;
            this.getWinnerPage();
        }

        const winCountWindow = document.querySelector('.count-winners');
        if (winCountWindow) winCountWindow.innerHTML = ` (${this.serverRequest.winnersCount})`;
        const pageWindow = document.querySelector('.count-page-winners');
        if (pageWindow) pageWindow.innerHTML = ' ' + this.currentWinnerPage;

        const prew = document.querySelector('.winners-prev');
        const next = document.querySelector('.winners-next');
        prew?.classList.remove('blocked');
        next?.classList.remove('blocked');

        if (this.currentWinnerPage === 1) prew?.classList.add('blocked');
        if (this.currentWinnerPage === nPages) next?.classList.add('blocked');
    }

    private createHeader() {
        const winnersTd = document.querySelector('.winners-td');
        this.table = document.createElement('table');
        const tr = new ElementCreator({ tag: 'tr' });
        const number = new ElementCreator({ tag: 'th', content: 'Number' });
        const car = new ElementCreator({ tag: 'th', content: 'Car' });
        const name = new ElementCreator({ tag: 'th', content: 'Name' });
        const wins = new ElementCreator({
            tag: 'th',
            content: 'Wins',
            domEvent: 'click',
            callback: async () => {
                this.serverRequest.winnersSort = 'wins';
                const order = this.serverRequest.order === 'ASC' ? 'DESC' : 'ASC';
                this.serverRequest.order = order;
                this.getWinnerPage();
            },
        });
        const time = new ElementCreator({
            tag: 'th',
            content: 'Best time(seconds)',
            domEvent: 'click',
            callback: async () => {
                this.serverRequest.winnersSort = 'time';
                const order = this.serverRequest.order === 'ASC' ? 'DESC' : 'ASC';
                this.serverRequest.order = order;
                this.getWinnerPage();
            },
        });
        tr.innerHtml([number.getElement(), car.getElement(), name.getElement(), wins.getElement(), time.getElement()]);
        this.table.appendChild(tr.getElement());
        winnersTd?.appendChild(this.table);
    }

    private createLine(winner: Wins) {
        const numb = (this.currentWinnerPage - 1) * WINNERS_PER_PAGE + this.table.children.length;
        const tr = new ElementCreator({ tag: 'tr' });
        const number = new ElementCreator({ tag: 'td', content: numb.toString() });
        const carParam: SVGParams = {
            className: ['car'],
            color: winner.color,
            id: `${winner.id}w`,
        };
        const carPicture = new SvgElementCreator(carParam);
        const car = new ElementCreator({ tag: 'td' });
        car.innerHtml([carPicture.getElement()]);
        const name = new ElementCreator({ tag: 'td', content: winner.name });
        const wins = new ElementCreator({ tag: 'td', content: winner.wins.toString() });
        const time = new ElementCreator({ tag: 'td', content: winner.time.toString() });
        tr.innerHtml([number.getElement(), car.getElement(), name.getElement(), wins.getElement(), time.getElement()]);
        this.table.appendChild(tr.getElement());
    }
}
