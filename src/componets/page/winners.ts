import './style/winners.scss';
import ElementCreator from '../utility/elem-creator';
import { PARAMS } from './parametrs/winners-param';

export class Winners {
    private winners: ElementCreator;

    constructor() {
        this.winners = new ElementCreator(PARAMS.winners);
        this.renderWinners();
    }

    private renderWinners() {
        const title = new ElementCreator(PARAMS.title);
        title.innerHtml([new ElementCreator(PARAMS.countWinners).getElement()]);
        const pageNumber = new ElementCreator(PARAMS.pageNumber);
        pageNumber.innerHtml([new ElementCreator(PARAMS.countPage).getElement()]);
        const winnersTd = new ElementCreator(PARAMS.winnersTd);

        const nav = new ElementCreator(PARAMS.nav);
        nav.innerHtml([new ElementCreator(PARAMS.prev).getElement(), new ElementCreator(PARAMS.next).getElement()]);

        this.winners.innerHtml([title.getElement(), pageNumber.getElement(), winnersTd.getElement(), nav.getElement()]);
    }

    public getElement() {
        return this.winners.getElement();
    }
}
