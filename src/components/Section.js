export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer(this._container);
  }

  addItem = (item) => {
    this._renderer(item);
  };

  addItems(items) {
    items.reverse().forEach((item) => {
      return this._renderer(item);
    });
  }
}
