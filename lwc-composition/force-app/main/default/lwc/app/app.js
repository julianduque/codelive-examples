import { LightningElement, wire } from "lwc";
import getCars from "@salesforce/apex/CarsController.getCars";

export default class App extends LightningElement {
  @wire(getCars)
  cars;

  handleNext() {
    this.template.querySelector("c-gallery").next();
  }
}
