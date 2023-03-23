import { LightningElement } from 'lwc';

export default class App extends LightningElement {

  handleNext() {
    this.template.querySelector('c-gallery').next();
  }
}