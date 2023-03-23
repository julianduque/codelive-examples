import { LightningElement } from "lwc";
import listBooks from "@salesforce/apex/BooksController.listBooks";

export default class BooksList extends LightningElement {
  data = [];
  columns = [
    { label: "ID", fieldName: "id" },
    { label: "Title", fieldName: "title" },
    { label: "Author", fieldName: "author" },
    { label: "Published At", fieldName: "publishedAt", type: "date" }
  ];

  async connectedCallback() {
    await this.loadBooks();
  }

  async loadBooks() {
    console.log("Loading data from Books API");
    try {
      const data = await listBooks();
      this.data = data;
    } catch (error) {
      console.log(error);
    }
  }

  async handleRefresh() {
    await this.loadBooks();
  }
}
