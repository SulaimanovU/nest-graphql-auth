import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    const book = new User();
    book.name = 'test';
    book.email = 'emaail@mail.ru'

    return [book];
  }
}
