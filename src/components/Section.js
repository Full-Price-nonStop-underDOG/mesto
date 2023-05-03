export class Section {
  constructor(containerSelector) {
    this._items = [];
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    this._items = cards;
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
