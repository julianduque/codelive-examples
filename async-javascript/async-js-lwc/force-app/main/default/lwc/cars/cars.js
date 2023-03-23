import { LightningElement } from 'lwc';

const API_URL = 'https://jduque-mock-apis.herokuapp.com';

export default class Cars extends LightningElement {
  data = [];
  isLoading = false;
  columns = [
    { label: 'ID', fieldName: 'id' },
    { label: 'Make', fieldName: 'make' },
    { label: 'Model', fieldName: 'model'},
    { label: 'Year', fieldName: 'year' },
    { label: 'Color', fieldName: 'color' }
  ];

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Hello from sleep'), ms);
    });
  }

  async fetchCars () {
    const res = await fetch(API_URL + '/apis/cars');
    const json = await res.json();
    return json;
  }

  async fetchCarsLarge () {
    const res = await fetch(API_URL + '/apis/cars/large');
    const json = await res.json();
    return json;
  }

  async fetchCarsError () {
    const res = await fetch(API_URL + '/apis/cars?boom=true');
    if (!res.ok) {
      throw new Error('Boom');
    }
    const json = await res.json();
    return json;
  }

  async getCars () {
    this.isLoading = true;
    // Perform Async Operation
    try {
      const [cars, carsLarge] = await Promise.all([
        this.fetchCars(),
        this.fetchCarsLarge()
       // this.fetchCarsError()
      ]);
      this.data = cars;
    } catch (err) {
      console.error(err);
    }
    this.isLoading = false;
  }
}
