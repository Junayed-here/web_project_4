// Section class
import {cardList} from "../utils/constants.js";
export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = classSelector;
        this.addItem.bind(this);
    }

    setItem(element) {
        this._container.append(element);
    }

    addItem(item){
        this._items.unshift(item);
    };

    pushItem(item){
        this._items.push(item);
    };

    renderItems() {
        cardList.innerHTML = '';
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}