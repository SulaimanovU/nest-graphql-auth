import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class UserEntity {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;
}