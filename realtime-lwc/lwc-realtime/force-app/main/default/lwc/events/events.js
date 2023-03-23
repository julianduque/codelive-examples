import { LightningElement } from "lwc";
import {
  subscribe,
  unsubscribe,
  onError,
  setDebugFlag,
  isEmpEnabled,
} from 'lightning/empApi';

export default class Events extends LightningElement {
  result = "";
  channelName = "";
  isSubscribed = false;
  subscription;

  connectedCallback() {
    if (!isEmpEnabled) {
      console.log('Dont support EMP');
      return;
    }

    setDebugFlag(true);
    onError((error) => {
      console.error(error);
    });
  }

  get subscriptionButtonLabel() {
    return this.isSubscribed ? "Unsubscribe" : "Subscribe";
  }

  handleChannelNameChange({ target }) {
    this.channelName = target.value;
  }

  handleSubscription () {
    if (!this.channelName) return;

    if (!this.isSubscribed) {
      // Subscription logic
      this.handleSubscribe();
    } else {
      // Unsubscription logic
      this.handleUnsubscribe();
    }
  }

  handleSubscribe () {
    const messageCallback = (response) => {
      this.result = JSON.stringify(response, null, 2);
    }

    subscribe(this.channelName, -1, messageCallback)
      .then(response => {
        this.subscription = response;
        this.isSubscribed = true;
      });
  }

  handleUnsubscribe () {
    unsubscribe(this.subscription, () => {
      this.isSubscribed = false;
      this.result = "";
    });
  }
}
