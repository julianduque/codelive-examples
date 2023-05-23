import { LightningElement, api, wire } from "lwc";
import { MessageContext, publish } from "lightning/messageService";
import CAR_SELECTED_CHANNEL from "@salesforce/messageChannel/Car_Selected__c";

export default class GalleryItem extends LightningElement {
  @api recordId;
  @api title;
  @api src;
  @api alt;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    const event = new CustomEvent("imageadded", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleClick(event) {
    event.preventDefault();
    publish(this.messageContext, CAR_SELECTED_CHANNEL, {
      recordId: this.recordId
    });
  }
}
