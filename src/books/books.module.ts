import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  providers: [BooksResolver, BooksService]
})
export class BooksModule {}
