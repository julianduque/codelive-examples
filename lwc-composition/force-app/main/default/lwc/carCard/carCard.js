import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from "@salesforce/schema/Car__c.Name";
import IMAGE_URL_FIELD from "@salesforce/schema/Car__c.Image_Url__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Car__c.Description__c";

import { subscribe, MessageContext } from "lightning/messageService";
import CAR_SELECTED_CHANNEL from "@salesforce/messageChannel/Car_Selected__c";

const fields = [NAME_FIELD, IMAGE_URL_FIELD, DESCRIPTION_FIELD];

export default class CarCard extends LightningElement {
  subscription = null;
  recordId;

  Name;
  Image_Url__c;
  Description__c;

  @wire(getRecord, { recordId: "$recordId", fields })
  wireRecord({ error, data }) {
    if (error) {
      const errorEvent = new ShowToastEvent({
        title: "An error ocurred",
        variant: "error",
        message: error.message
      });
      this.dispatchEvent(errorEvent);
    } else {
      fields.forEach(
        (item) => (this[item.fieldApiName] = getFieldValue(data, item))
      );
    }
  }

  @wire(MessageContext)
  messageContext;

  subscribeToChannel() {
    this.subscription = subscribe(
      this.messageContext,
      CAR_SELECTED_CHANNEL,
      (message) => this.handleMessage(message)
    );
  }

  handleMessage(message) {
    this.recordId = message.recordId;
  }

  connectedCallback() {
    this.subscribeToChannel();
  }
}
