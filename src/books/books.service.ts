import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { PrismaService } from '../prisma.service';
import {
  User,
  Prisma
} from '@prisma/client';

@Injectable()
export class BooksService {
  async findAll(): Promise<Book[]> {
    const book = new Book();
    book.id = 1;
    book.name = 'test';

    return [book];
  }
}
