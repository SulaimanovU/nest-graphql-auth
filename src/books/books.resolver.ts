import { Resolver, Query } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(pf => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(returns => [Book])
  booksOpen(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(returns => [Book])
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
