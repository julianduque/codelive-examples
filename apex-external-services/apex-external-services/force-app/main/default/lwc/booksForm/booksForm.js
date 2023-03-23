import { LightningElement } from "lwc";
import createBook from "@salesforce/apex/BooksController.createBook";

export default class BooksForm extends LightningElement {
  title = "";
  author = "";

  handleTitleChange({ target }) {
    this.title = target.value;
  }

  handleAuthorChange({ target }) {
    this.author = target.value;
  }

  async handleCreate() {
    console.log("Creating a book using the external Books API");

    try {
      const data = await createBook({
        title: this.title,
        author: this.author
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    this.title = "";
    this.author = "";
  }
}
