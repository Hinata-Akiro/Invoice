import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field()
  description: string;
  @Field()
  rate: number;
  @Field()
  quantity: number;
}
