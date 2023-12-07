import { CAR_PER_PAGE } from '../constants';
import { Car, CarRequest, PageNavigation, WinnerCar } from '../types/index';
import { Track } from './page/track';
import { WinnerTable } from './page/winners-table';
import { ServerRequest } from './server-request';
import { randomCars } from './utility/functions';
import { Winner } from './utility/winner';

export class Controls {
    private serverRequest: ServerRequest;
    private winnerTable!: WinnerTable;
    private currentGaragePage: number;
    public cars: Track[] | undefined;

    constructor(serverRequest: ServerRequest) {
        this.serverRequest = serverRequest;
        this.currentGaragePage = 1;
        this.getGaragePage();
        this.choosePage();
    }
    public setWinnerTable(winnerTable: WinnerTable) {
        this.winnerTable = winnerTable;
    }

    private async getGaragePage() {
        this.clearGarage();
        const cars = await this.serverRequest.getCars(this.currentGaragePage);
        this.cars = cars.map((car: Car) => new Track(car, this.serverRequest));
        this.cars?.forEach((car) => {
            const btn = car.getRemoveBtn();
            btn?.addEventListener('click', async () => {
                await car.deleteCar();
                this.getGaragePage();
                this.choosePage();
                await this.winnerTable.getWinnerPage();
                await this.winnerTable.choosePage();
            });
        });
    }

    private clearGarage() {
        const carsWrapper = document.querySelector('.cars-wrapper');
        while (carsWrapper?.hasChildNodes()) {
            carsWrapper.firstChild?.remove();
        }
    }

    public async startRace() {
        const winner = this.cars?.map((track) => track.runCar()) as [Promise<WinnerCar | string>];
        Promise.any(winner).then(async (data) => {
            if (typeof data === 'string') return new Winner(data, this.serverRequest);
            await this.serverRequest.createWinner(data);
            await this.winnerTable.getWinnerPage();
            await this.winnerTable.choosePage();
            new Winner(data, this.serverRequest);
        });
    }

    public async reset() {
        this.cars?.forEach((car) => car.returnCar());
    }

    public async createCar() {
        const input = document.getElementById('text-create') as HTMLInputElement | null;
        const palette = document.getElementById('color-create') as HTMLInputElement | null;
        const name = input?.value;
        const color = palette?.value;
        const car: CarRequest = {
            name: name ? name : ' ',
            color: color ? color : '#ff0000',
        };
        try {
            await this.serverRequest.createCar(car);
            if (this.cars) {
                if (this.cars.length < CAR_PER_PAGE) this.getGaragePage();
            }
            this.choosePage();
        } catch (e) {
            console.log(e);
        }
    }

    public async updateCar() {
        const input = document.getElementById('text-update') as HTMLInputElement | null;
        const palette = document.getElementById('color-update') as HTMLInputElement | null;
        const name = input?.value;
        const color = palette?.value;
        const car: CarRequest = {
            name: name ? name : ' ',
            color: color ? color : '#ff0000',
        };
        try {
            const result = await this.serverRequest.updateCar(car);
            if (result) this.getGaragePage();
        } catch (e) {
            console.log(e);
        }
    }

    public async createCars() {
        try {
            const createRequests = randomCars().map(async (car) => this.serverRequest.createCar(car));
            await Promise.all(createRequests);
            if (this.cars) {
                if (this.cars.length < CAR_PER_PAGE) this.getGaragePage();
            }
            this.choosePage();
        } catch (e) {
            console.log(e);
        }
    }

    public async choosePage(key?: PageNavigation) {
        await this.serverRequest.getCars();
        const nPages = this.serverRequest.carPagesCount ? this.serverRequest.carPagesCount : 1;
        let page = this.currentGaragePage ? this.currentGaragePage : 1;
        if (key === '+') page += 1;
        if (key === '-') page -= 1;
        if (page === 0) page = 1;
        if (page > nPages) page = nPages;

        if (this.currentGaragePage !== page) {
            this.currentGaragePage = page;
            this.getGaragePage();
        }

        const carCountWindow = document.querySelector('.count-cars');
        if (carCountWindow) carCountWindow.innerHTML = ` (${this.serverRequest.carCount})`;
        const pageWindow = document.querySelector('.count-page-garage');
        if (pageWindow) pageWindow.innerHTML = ' ' + this.currentGaragePage;

        const prew = document.querySelector('.garage-prev');
        const next = document.querySelector('.garage-next');
        prew?.classList.remove('blocked');
        next?.classList.remove('blocked');

        if (this.currentGaragePage === 1) prew?.classList.add('blocked');
        if (this.currentGaragePage === nPages) next?.classList.add('blocked');
    }
}
