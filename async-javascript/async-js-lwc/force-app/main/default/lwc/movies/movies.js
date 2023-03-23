import { LightningElement } from 'lwc';

const API_URL = 'https://jduque-mock-apis.herokuapp.com';

export default class Movies extends LightningElement {
  data = [];
  isLoading = false;
  columns = [
    { label: 'ID', fieldName: 'id' },
    { label: 'Title', fieldName: 'name' },
    { label: 'Genre', fieldName: 'genre' }
  ];

  getMovies () {
    this.isLoading = true;
    // Perform Async Operation
    fetch(API_URL + '/apis/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json();
      })
      .then((json) => {
        this.data = json;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getMoviesAsync () {
    this.isLoading = true;
    await this.sleep(2000);
    // Perform Async Operation
    try {
      const res = await fetch(API_URL + '/apis/movies');
      const json = await res.json();
      this.data = json;
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }
}