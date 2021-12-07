import { Resolver, Query } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Resolver(pf => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(returns => [Book])
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
