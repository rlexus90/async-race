import { Car, Params, WinnerCar } from '../../types/index';
import { ServerRequest } from '../server-request';
import ElementCreator from './elem-creator';

export class Winner {
    private serverRequest: ServerRequest;
    private winner: WinnerCar | string;

    constructor(winner: WinnerCar | string, serverRequest: ServerRequest) {
        this.serverRequest = serverRequest;
        this.winner = winner;
        this.showMessge();
    }

    private async getMessage() {
        if (typeof this.winner === 'string') return 'No WINNERS - time is out';
        const car: Car = await this.serverRequest.getCar(this.winner[0]);
        const name = car.name;
        const time = Math.round(this.winner[1] / 10) / 100;
        return `${name} win's (${time}s)`;
    }

    private async showMessge() {
        const message = await this.getMessage();
        const param: Params = {
            tag: 'div',
            className: ['winner-message'],
            content: message,
        };
        const messageWindow = new ElementCreator(param).getElement();
        document.body.appendChild(messageWindow);
        const remove = () => {
            messageWindow.remove();
            window.removeEventListener('click', remove);
        };
        window.addEventListener('click', remove);
    }
}
