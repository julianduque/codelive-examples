import { LightningElement, api } from 'lwc';

export default class SimpleMessage extends LightningElement {
  @api message = 'Hello World';
}