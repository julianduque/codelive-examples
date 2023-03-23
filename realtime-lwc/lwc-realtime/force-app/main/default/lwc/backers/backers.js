import { LightningElement } from "lwc";

export default class Backers extends LightningElement {
  campaignName = "Learning WebSockets";
  goal = 1_000_000;
  amountRaised = 0;
  percentageRaised = 0;
  lastBacker;
  wsSocket;

  connectedCallback () {
    this.wsSocket = new WebSocket("wss://jduque-backers-ws.herokuapp.com/ws");

    this.wsSocket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    this.wsSocket.addEventListener("message", (event) => {
      const payload = JSON.parse(event.data);

      this.amountRaised += +payload.amount;
      this.lastBacker = payload;

      this.percentageRaised = this.amountRaised / this.goal;
    });

    this.wsSocket.addEventListener("error", (error) => {
      console.error(error);
    });
  }
}
