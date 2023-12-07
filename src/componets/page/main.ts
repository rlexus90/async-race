import './style/main.scss';
import { Header } from './header';
import { Garage } from './garage';
import { Winners } from './winners';
import { Controls } from '../constrols';
import icon from '../../assets/images/mcquin.png';

export class MainPage {
    constructor(controls: Controls) {
        const header = new Header();
        const garage = new Garage(controls);
        const winners = new Winners();
        document.body.appendChild(header.getElement());
        document.body.appendChild(garage.getElement());
        document.body.appendChild(winners.getElement());
        this.hidePage();
        this.addFavicon();
    }

    private hidePage() {
        const page = window.localStorage.getItem('hideWindow');
        if (page) {
            const window = document.querySelector(page);
            if (window) window.classList.add('hidden');
        } else {
            const window = document.querySelector('.winners');
            if (window) window.classList.add('hidden');
        }
    }

    private addFavicon() {
        const favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        favicon.href = icon;
        document.head.appendChild(favicon);
    }
}
