import { LightningElement, api } from 'lwc';

export default class NotificationMessage extends LightningElement {
  @api variant;

  variants = {
    info: 'utility:info',
    success: 'utility:success',
    warning: 'utility:warning',
    error: 'utility:error'
  };

  get variantAltText() {
    return `${this.variant ?? 'info'}`;
  }

  get variantIcon() {
    return this.variants[this.variant] ?? this.variants.info;
  }
}