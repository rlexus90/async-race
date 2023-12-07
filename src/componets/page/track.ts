import './style/track.scss';
import { Car, SVGParams } from '../../types/index';
import ElementCreator from '../utility/elem-creator';
import { PARAMS } from './parametrs/track-param';
import img from '../../assets/images/finish.svg';
import { SvgElementCreator } from '../utility/svg-elem-creator';
import { ServerRequest } from '../server-request';
import { RACE_TIME } from '../../constants';

export class Track {
    private name: string;
    private color: string;
    private id: string;
    private track: HTMLElement;
    private serverRequest: ServerRequest;
    private intervalId: NodeJS.Timer | undefined;
    private remove: HTMLElement | undefined;
    private run: HTMLElement | undefined;
    private back: HTMLElement | undefined;

    constructor(car: Car, serverRequest: ServerRequest) {
        const carsWrapper = document.querySelector('.cars-wrapper');
        const trackParam = PARAMS.track;
        this.serverRequest = serverRequest;
        this.id = car.id ? car.id.toString() : '';
        trackParam.id = this.id;
        this.name = car.name;
        this.color = car.color;
        this.track = new ElementCreator(trackParam).getElement();
        this.renderTrack();
        carsWrapper?.appendChild(this.track);
    }

    public async runCar() {
        const race = new Promise((resolve) => {
            (async () => {
                try {
                    if (this.run) this.run.classList.add('blocked');
                    if (this.back) this.back.classList.remove('blocked');
                    const speed = await this.serverRequest.startEngine(this.id);
                    const car: HTMLDivElement | null = document.querySelector(`#car_${this.id}`);
                    const dX = speed / 60;
                    let position = car?.offsetLeft ? car.offsetLeft : 0;
                    const finish = window.innerWidth - 220;
                    const startTime = Date.now();
                    this.intervalId = setInterval(() => {
                        position += dX;
                        if (car) car.style.transform = `translateX(${position}px)`;
                        if (position >= finish) {
                            if (this.intervalId) clearInterval(this.intervalId);
                            resolve([+this.id, Date.now() - startTime]);
                        }
                    }, 16);

                    const drive = await this.serverRequest.drive(this.id);
                    if (!drive) {
                        clearInterval(this.intervalId);
                        setTimeout(() => resolve('Engine Broken'), RACE_TIME);
                    }
                } catch (e) {
                    console.log(e);
                }
            })();
        });
        return race;
    }
    public async returnCar() {
        const car: HTMLDivElement | null = document.querySelector(`#car_${this.id}`);
        if (this.run) this.run.classList.remove('blocked');
        if (this.back) this.back.classList.add('blocked');
        await this.serverRequest.stopEngine(this.id);
        if (this.intervalId) clearInterval(this.intervalId);
        if (car) car.style.transform = `translateX(0px)`;
    }

    private selectCar() {
        const input = document.getElementById('text-update') as HTMLInputElement | null;
        const palette = document.getElementById('color-update') as HTMLInputElement | null;
        if (input) input.value = this.name;
        if (palette) palette.value = this.color;
        this.serverRequest.setId(this.id);
    }
    public getRemoveBtn() {
        return this.remove;
    }

    public async deleteCar() {
        await this.serverRequest.deleteCar(this.id);
    }

    private renderTrack() {
        const trackNav = new ElementCreator(PARAMS.tackNav);
        const nameParam = PARAMS.name;
        nameParam.content = this.name;
        const select = new ElementCreator(PARAMS.select).getElement();
        select.addEventListener('click', () => {
            this.selectCar();
        });
        this.remove = new ElementCreator(PARAMS.remove).getElement();
        trackNav.innerHtml([select, this.remove, new ElementCreator(nameParam).getElement()]);

        const roadConteiner = new ElementCreator(PARAMS.roadConteiner);
        const road = new ElementCreator(PARAMS.road).getElement();
        const url = `url('${img}')`;
        road.style.backgroundImage = url;
        const carParam: SVGParams = {
            className: ['car'],
            color: this.color,
            id: this.id,
        };
        const car = new SvgElementCreator(carParam);
        road.appendChild(car.getElement());
        this.run = new ElementCreator(PARAMS.run).getElement();
        this.run.addEventListener('click', async () => {
            await this.runCar();
        });
        this.back = new ElementCreator(PARAMS.back).getElement();
        this.back.addEventListener('click', async () => {
            await this.returnCar();
        });
        roadConteiner.innerHtml([this.run, this.back, road]);

        this.track.appendChild(trackNav.getElement());
        this.track.appendChild(roadConteiner.getElement());
    }
}
