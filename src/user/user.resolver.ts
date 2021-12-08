import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 
import { CreateUserInput, GetUserInput } from 'src/user/dto/create-user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  User,
  Prisma
} from '@prisma/client';
import { BadRequestException, Res, UseGuards } from '@nestjs/common';
import express, { Response } from 'express';

@Resolver(pf => UserEntity)
export class UsersResolver {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) {}

  @UseGuards(AuthGuard)
  @Query(returns => [UserEntity])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => [UserEntity])
  usersOpen(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(returns => UserEntity)
  register(@Args('createUserInput') userCreateInput: CreateUserInput): Promise<User> {
    return this.userService.createUser(userCreateInput);
  }

  @Query(returns => UserEntity)
  async login(
      @Args('getUserInput') getUserInput: GetUserInput, 
      @Res({ passthrough: true }) response: Response,
      @Context("req") req: express.Request
    ): Promise<User> {
    const data = {email: getUserInput.email}
    const user = await this.userService.findOne(data);
    if(!user) {
      throw new BadRequestException('invalid credentials')
    }
    if (!await bcrypt.compare(getUserInput.password, user.password)) {
      throw new BadRequestException('invalid credentials')
    }

    const jwt = await this.jwtService.signAsync({ id: user.id })

    console.log(jwt);


    req.res?.cookie('jwt', jwt);

    return user;
  }
}
