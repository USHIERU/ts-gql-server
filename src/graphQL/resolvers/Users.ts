import { Query, Resolver, Arg } from 'type-graphql';
import UserDAO from './../../DAO/UserDAO';
import UserDTO from './../../DTO/UserDTO';

@Resolver()
export class UserResolver {
    @Query(() => Boolean)
    async createUser(
        @Arg('name') name: string,
        @Arg('lastName') lastName: string
    ) {
        try {
            await UserDAO.create(new UserDTO({ name, lastName }));
            return true;
        } catch (error) {
            return false;
        }
    }

    @Query(() => [UserDTO])
    async readUsers() {
        try {
            const data = await UserDAO.read();
            return data;
        } catch (error) {
            return false;
        }
    }
}