import { SVGParams } from '../../types/index';
import car from '../../assets/images/sprite.svg';

export class SvgElementCreator {
    private element: HTMLDivElement;

    constructor(params: SVGParams) {
        this.element = document.createElement('div');
        params.className.forEach((el) => {
            this.element.classList.add(el);
        });
        if (params.id) this.element.id = `car_${params.id}`;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${car}#car`);
        svg.appendChild(use);
        svg.style.fill = params.color;
        this.element.appendChild(svg);
    }

    public getElement() {
        return this.element;
    }
}
