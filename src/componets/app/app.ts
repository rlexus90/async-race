import { Controls } from '../constrols';
import { MainPage } from '../page/main';
import { WinnerTable } from '../page/winners-table';
import { ServerRequest } from '../server-request';

export class App {
    constructor() {
        const serverRequest = new ServerRequest();
        const controls = new Controls(serverRequest);
        new MainPage(controls);
        const winnerTable = new WinnerTable(serverRequest);
        controls.setWinnerTable(winnerTable);
    }
}
