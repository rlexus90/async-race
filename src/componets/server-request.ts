import { BASE_URL, CAR_PER_PAGE, WINNERS_PER_PAGE } from '../constants';
import { CarRequest, Order, QueryOption, WinnerCar, WinnerRequest, WinnerResp, WinnersSort } from '../types/index';
import { errorUpdate, qeuryString } from './utility/functions';

export class ServerRequest {
    public carPagesCount: number | undefined;
    private updateId: string | undefined | null;
    public carCount: number | undefined;
    public winnersCount: number | undefined;
    public winnersPagesCount: number | undefined;
    public winnersSort: WinnersSort | undefined;
    public order: Order | undefined;

    public async getCars(n = 1) {
        const query: QueryOption[] = [
            { key: '_page', value: n },
            { key: '_limit', value: CAR_PER_PAGE },
        ];
        const response = await fetch(`${BASE_URL}/garage${qeuryString(query)}`);
        const cars = await response.json();
        this.carCount = response.headers.get('X-Total-Count') ? Number(response.headers.get('X-Total-Count')) : 0;
        this.carPagesCount = Math.ceil(this.carCount / CAR_PER_PAGE);
        return cars;
    }

    public async getCar(n: number) {
        const response = await fetch(`${BASE_URL}/garage/${n}`);
        const car = await response.json();
        return car;
    }

    public async createCar(car: CarRequest) {
        try {
            await fetch(`${BASE_URL}/garage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car),
            });
        } catch (e) {
            console.log(e);
        }
    }

    public setId(id: string) {
        this.updateId = id;
    }

    public async updateCar(car: CarRequest) {
        if (!this.updateId) {
            errorUpdate();
            return false;
        }
        try {
            await fetch(`${BASE_URL}/garage/${this.updateId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car),
            });
            return true;
        } catch (e) {
            console.log(e);
        }
    }

    public async deleteCar(id: string) {
        if (this.updateId === id) this.updateId = null;
        try {
            await fetch(`${BASE_URL}/garage/${id}`, {
                method: 'DELETE',
            });
            await this.deleteWinner(id);
        } catch (e) {
            console.log(e);
        }
    }

    public async startEngine(id: string) {
        const query: QueryOption[] = [
            { key: 'id', value: id },
            { key: 'status', value: 'started' },
        ];
        try {
            const response = await fetch(`${BASE_URL}/engine${qeuryString(query)}`, {
                method: 'PATCH',
            });
            const param = await response.json();
            return param.velocity;
        } catch (e) {
            console.log(e);
        }
    }

    public async stopEngine(id: string) {
        const query: QueryOption[] = [
            { key: 'id', value: id },
            { key: 'status', value: 'stopped' },
        ];
        try {
            await fetch(`${BASE_URL}/engine${qeuryString(query)}`, {
                method: 'PATCH',
            });
        } catch (e) {
            console.log(e);
        }
    }

    public async drive(id: string) {
        const query: QueryOption[] = [
            { key: 'id', value: id },
            { key: 'status', value: 'drive' },
        ];
        try {
            const response = await fetch(`${BASE_URL}/engine${qeuryString(query)}`, {
                method: 'PATCH',
            });
            const status = await response.status;
            if (status === 200) return true;
            if (status === 500) return false;
        } catch (e) {
            console.log(e);
        }
    }

    public async getWinners(n = 1) {
        const query: QueryOption[] = [
            { key: '_page', value: n },
            { key: '_limit', value: WINNERS_PER_PAGE },
            { key: '_sort', value: this.winnersSort ? this.winnersSort : 'time' },
            { key: '_order', value: this.order ? this.order : 'ASC' },
        ];
        const response = await fetch(`${BASE_URL}/winners${qeuryString(query)}`);
        const winners = await response.json();
        this.winnersCount = response.headers.get('X-Total-Count') ? Number(response.headers.get('X-Total-Count')) : 0;
        this.winnersPagesCount = Math.ceil(this.winnersCount / WINNERS_PER_PAGE);
        return winners;
    }

    public async getWinner(n: number) {
        const response = await fetch(`${BASE_URL}/winners/${n}`);
        if (response.status === 404) return undefined;
        const winner = await response.json();
        return winner;
    }

    public async createWinner(arr: WinnerCar) {
        const time = Math.round(arr[1] / 10) / 100;
        const winner = await this.getWinner(arr[0]);
        if (!winner) {
            const win: WinnerResp = {
                id: arr[0],
                wins: 1,
                time: time,
            };
            await fetch(`${BASE_URL}/winners`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(win),
            });
        } else {
            this.updateWinner(winner, time);
        }
    }

    private async updateWinner(winner: WinnerResp, time: number) {
        const win: WinnerRequest = {
            wins: winner.wins + 1,
            time: time < winner.time ? time : winner.time,
        };
        await fetch(`${BASE_URL}/winners/${winner.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(win),
        });
    }

    public async deleteWinner(id: string) {
        try {
            await fetch(`${BASE_URL}/winners/${id}`, {
                method: 'DELETE',
            });
        } catch (e) {
            console.log(e);
        }
    }
}
