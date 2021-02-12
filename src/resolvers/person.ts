import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Person } from '../entities';
import { PersonInput } from '../entities/inputTypes';

@Resolver()
export class PersonResolver {
  @Query(() => [Person])
  people(): Promise<Person[]> {
    return Person.find();
  }

  @Query(() => Person, { nullable: true })
  person(@Arg('id', () => Int) id: number): Promise<Person | undefined> {
    return Person.findOne(id);
  }

  @Mutation(() => Person)
  addPerson(
    @Arg('input', () => PersonInput) input: PersonInput
  ): Promise<Person> {
    const { name, age } = input;
    return Person.create({ name, age }).save();
  }
}
