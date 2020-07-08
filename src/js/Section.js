// Section class
export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = classSelector;
    }

    setItem(element) {
        this._container.append(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}