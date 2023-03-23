public with sharing class BooksController {
  @AuraEnabled
  public static ExternalService.BookService_book createBook(String title, String author) {
    ExternalService.BookService service = new ExternalService.BookService();

    ExternalService.BookService_book book = new ExternalService.BookService_book();
    book.title = title;
    book.author = author;

    ExternalService.BookService.postBooks_Request input = new ExternalService.BookService.postBooks_Request();
    input.body = book;

    ExternalService.BookService.postBooks_Response response = service.postBooks(input);
    return response.Code201;
  }

  @AuraEnabled
  public static List<ExternalService.BookService_book> listBooks() {
    ExternalService.BookService service = new ExternalService.BookService();

    ExternalService.BookService.getBooks_Response response = service.getBooks();
    List<ExternalService.BookService_book> books = response.Code200;

    return books;
  }
}
