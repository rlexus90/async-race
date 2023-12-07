import './style/garage.scss';
import ElementCreator from '../utility/elem-creator';
import { PARAMS } from './parametrs/garage-param';
import { Controls } from '../constrols';

export class Garage {
    private garage: ElementCreator;
    private controls: Controls;

    constructor(controls: Controls) {
        this.garage = new ElementCreator(PARAMS.garage);
        this.controls = controls;
        this.renderGarage();
    }

    private renderGarage() {
        const forms = new ElementCreator(PARAMS.forms);
        const createForm = new ElementCreator(PARAMS.createForm);
        const textIputCreate = new ElementCreator(PARAMS.textIputCreate).getElement();
        textIputCreate.setAttribute('type', 'text');
        const colorInputCreate = new ElementCreator(PARAMS.colorInputCreate).getElement();
        colorInputCreate.setAttribute('type', 'color');
        colorInputCreate.setAttribute('value', '#ffffff');
        const createBtn = new ElementCreator(PARAMS.createBtn).getElement();
        createBtn.addEventListener('click', async () => {
            await this.controls.createCar();
        });
        createForm.innerHtml([textIputCreate, colorInputCreate, createBtn]);
        const updateForm = new ElementCreator(PARAMS.updateForm);
        const textIputUpdate = new ElementCreator(PARAMS.textIputUpdate).getElement();
        textIputUpdate.setAttribute('type', 'text');
        const colorInputUpdate = new ElementCreator(PARAMS.colorInputUpdate).getElement();
        colorInputUpdate.setAttribute('type', 'color');
        colorInputUpdate.setAttribute('value', '#ffffff');
        const updateBtn = new ElementCreator(PARAMS.updateBtn).getElement();
        updateBtn.addEventListener('click', async () => {
            await this.controls.updateCar();
        });
        updateForm.innerHtml([textIputUpdate, colorInputUpdate, updateBtn]);
        forms.innerHtml([createForm.getElement(), updateForm.getElement()]);

        const raceBtn = new ElementCreator(PARAMS.raceBtn).getElement();
        raceBtn.addEventListener('click', async () => {
            this.controls.startRace();
            raceBtn.classList.add('blocked');
        });
        const resetBtn = new ElementCreator(PARAMS.resetBtn).getElement();
        resetBtn.addEventListener('click', async () => {
            this.controls.reset();
            raceBtn.classList.remove('blocked');
        });
        const generateCarsBtn = new ElementCreator(PARAMS.generateCarsBtn).getElement();
        generateCarsBtn.addEventListener('click', async () => {
            this.controls.createCars();
        });
        const controls = new ElementCreator(PARAMS.controls);
        controls.innerHtml([raceBtn, resetBtn, generateCarsBtn]);

        const title = new ElementCreator(PARAMS.title);
        title.innerHtml([new ElementCreator(PARAMS.countCars).getElement()]);
        const pageNumber = new ElementCreator(PARAMS.pageNumber);
        pageNumber.innerHtml([new ElementCreator(PARAMS.countPage).getElement()]);
        const carsWrapper = new ElementCreator(PARAMS.carsWrapper);

        const nav = new ElementCreator(PARAMS.nav);
        const prev = new ElementCreator(PARAMS.prev).getElement();
        prev.addEventListener('click', async () => {
            await this.controls.choosePage('-');
        });
        const next = new ElementCreator(PARAMS.next).getElement();
        next.addEventListener('click', async () => {
            await this.controls.choosePage('+');
        });
        nav.innerHtml([prev, next]);

        this.garage.innerHtml([
            forms.getElement(),
            controls.getElement(),
            title.getElement(),
            pageNumber.getElement(),
            carsWrapper.getElement(),
            nav.getElement(),
        ]);
    }

    public getElement() {
        return this.garage.getElement();
    }
}
