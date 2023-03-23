import { LightningElement, api } from "lwc";

export default class Gallery extends LightningElement {
  @api title;
  @api showControls;
  items = [];
  _currentItem = 1;
  rendered = false;

  renderedCallback() {
    if (!this.rendered) {
      this.rendered = true;
      this.items = this.querySelectorAll("c-gallery-item") ?? [];
      this.updateCurrentItem();
    }
  }

  @api next() {
    if (this.isEmpty) return;

    this._currentItem++;
    if (this._currentItem > this.items.length) {
      this._currentItem = 1;
    }
    this.updateCurrentItem();
  }

  @api prev() {
    if (this.isEmpty) return;

    this._currentItem--;
    if (this._currentItem < 1) {
      this._currentItem = this.items.length;
    }
    this.updateCurrentItem();
  }

  updateCurrentItem() {
    if (this.isEmpty) return;

    this.template
      .querySelector("div.items")
      .replaceChildren(this.items[this._currentItem - 1]);
  }

  handleSlotChange() {
    console.log('Gallery was updated');
  }

  get currentItem() {
    return this.isEmpty ? 0 : this._currentItem;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get totalItems() {
    return this.items.length;
  }
}
