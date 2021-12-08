import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  providers: [UsersResolver, UserService, PrismaService]
})
export class UsersModule {}
