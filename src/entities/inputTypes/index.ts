import { InputType, Field, Int } from 'type-graphql';

@InputType()
class PersonInput {
  @Field()
  name!: string;

  @Field(() => Int)
  age!: number;
}

export { PersonInput };
