import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(@Arg('name', () => String, { nullable: true }) name = 'World') {
    return `Hello, ${name}!`;
  }

  @Query(() => String)
  bye(@Arg('name', () => String, { nullable: true }) name = 'World') {
    return `Goodbye, ${name}!`;
  }
}
