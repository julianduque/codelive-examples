import { LightningElement, api, track } from "lwc";

export default class Gallery extends LightningElement {
  @api title;
  @api showControls;
  @api showPagination;

  @track
  items = [];
  _currentItem = 1;
  rendered = false;

  renderedCallback() {
    if (this.rendered) return;
    if (this.items.length > 0) {
      this.updateCurrentItem();
      this.rendered = true;
    }
  }

  handleImageAdded(event) {
    this.items.push(event.target);
  }

  @api
  prev() {
    if (this.isEmpty) return;

    this._currentItem--;
    if (this._currentItem < 1) {
      this._currentItem = this.items.length;
    }
    this.updateCurrentItem();
  }

  @api
  next() {
    if (this.isEmpty) return;

    this._currentItem++;
    if (this._currentItem > this.items.length) {
      this._currentItem = 1;
    }
    this.updateCurrentItem();
  }

  updateCurrentItem() {
    if (this.isEmpty) return;

    this.template
      .querySelector("div.items")
      .replaceChildren(this.items[this._currentItem - 1]);
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get currentItem() {
    return this.isEmpty ? 0 : this._currentItem;
  }

  get totalItems() {
    return this.items.length;
  }
}
