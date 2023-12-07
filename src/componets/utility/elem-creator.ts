import { Params } from '../../types/index';

export default class ElementCreator {
    private element: HTMLElement | HTMLInputElement;

    constructor(params: Params) {
        this.element = document.createElement(params.tag);
        if (params.className) {
            params.className.forEach((e: string) => {
                this.element?.classList.add(e);
            });
        }
        if (params.id) this.element.id = params.id;
        if (params.content) this.element.textContent = params.content;
        if (params.callback) this.element.addEventListener(params.domEvent || 'click', params.callback);
    }

    public getElement() {
        return this.element;
    }

    public innerHtml(elements: HTMLElement[]): void {
        elements.forEach((e) => {
            this.element?.appendChild(e);
        });
    }
}
