import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

export default class CreateAccountUi extends LightningElement {
  accountName;
  annualRevenue;
  objectApiName = ACCOUNT_OBJECT.objectApiName;
  fields = [
    NAME_FIELD,
    ANNUAL_REVENUE_FIELD
  ];

  handleNameChange(event) {
    this.accountName = event.target.value;
  }

  handleAnnualRevenueChange(event) {
    this.annualRevenue = event.target.value;
  }

  createAccount() {
    // Logic
    const recordInput = {
      apiName: ACCOUNT_OBJECT.objectApiName,
      fields: {
        [NAME_FIELD.fieldApiName]: this.accountName,
        [ANNUAL_REVENUE_FIELD.fieldApiName]: this.annualRevenue
      }
    };
    createRecord(recordInput).then(() => {
      const success = new ShowToastEvent({
        title: 'Created successfully',
        message: 'An account has been created',
        variant: 'success'
      });
      this.dispatchEvent(success);
    }).catch(error => {
      const err = new ShowToastEvent({
        title: 'An error ocurred',
        message: error.message,
        variant: 'error'
      });
      this.dispatchEvent(err);
    });
  }
}