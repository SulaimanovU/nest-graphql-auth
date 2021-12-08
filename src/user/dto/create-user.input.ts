import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@InputType()
export class GetUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}