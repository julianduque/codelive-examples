import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Timers extends LightningElement {
  counter = 0;
  timeoutTime = 2000;
  intervalTime = 1000;
  intervalRef;
  isWaiting = false;
  isRunning = false;

  startTimeout () {
    // Execute a Timeout
    this.isWaiting = true;
    setTimeout(() => {
      this.showToast();
      this.isWaiting = false;
    }, this.timeoutTime);
  }

  startTimer () {
    // Start an Interval
    this.isRunning = true;
    this.intervalRef = setInterval(() => {
      this.counter++;
    }, this.intervalTime);
  }

  stopTimer () {
    // Stop an Interval
    clearInterval(this.intervalRef);
    this.isRunning = false;
  }

  handleChangeTimeout ({ target }) {
    this.timeoutTime = +target.value;
  }

  handleChangeInterval ({ target }) {
    this.intervalTime = +target.value;
  }

  get isNotRunning() {
    return !this.isRunning;
  }

  showToast () {
    const toast = new ShowToastEvent({
      title: 'It worked!',
      message: `I appeared after ${this.timeoutTime} ms`,
      variant: 'success'
    });

    this.dispatchEvent(toast);
  }
}