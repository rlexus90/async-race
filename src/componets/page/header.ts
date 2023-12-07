import './style/header.scss';
import ElementCreator from '../utility/elem-creator';
import { PARAMS } from './parametrs/header-param';

export class Header {
    private header: ElementCreator;
    private hideWindow: string | undefined;

    constructor() {
        this.header = new ElementCreator(PARAMS.header);
        this.renderHeader();
    }

    private renderHeader() {
        const nav = new ElementCreator(PARAMS.nav);
        const garage = new ElementCreator(PARAMS.garage).getElement();
        garage.addEventListener('click', () => {
            const garage = document.querySelector('.garage');
            const winers = document.querySelector('.winners');
            garage?.classList.remove('hidden');
            winers?.classList.add('hidden');
            this.hideWindow = '.winners';
        });
        const winers = new ElementCreator(PARAMS.winners).getElement();
        winers.addEventListener('click', () => {
            const garage = document.querySelector('.garage');
            const winers = document.querySelector('.winners');
            garage?.classList.add('hidden');
            winers?.classList.remove('hidden');
            this.hideWindow = '.garage';
        });
        nav.innerHtml([garage, winers]);
        this.header.getElement().appendChild(nav.getElement());

        window.addEventListener('beforeunload', () => {
            if (this.hideWindow) window.localStorage.setItem('hideWindow', this.hideWindow);
        });
    }

    public getElement() {
        return this.header.getElement();
    }
}
