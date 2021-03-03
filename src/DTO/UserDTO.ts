import { ObjectType, Field, ID } from 'type-graphql'

interface IUserDTO {
    _id?: any,
    name: string,
    lastName: string
}

@ObjectType()
export default class UserDTO {
    @Field(() => ID) 
    _id: any;

    @Field() 
    name: string;
    
    @Field() 
    lastName: string;

    constructor({ _id = null, name, lastName }: IUserDTO) {
        this._id = _id;
        this.name = name;
        this.lastName = lastName;
    }
}