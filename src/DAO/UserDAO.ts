import { Collection } from 'mongodb';
import IDAO from '../models/IDAO';
import Connection from '../models/Connection';
import UserDTO from '../DTO/UserDTO';
import { database } from '../database/index'

class UserDAO extends Connection<Collection> implements IDAO<UserDTO> {
    constructor(connection: Collection) {
        super(connection);
    }

    create(DTO: UserDTO): Promise<UserDTO> {
        return new Promise(resolve =>
            this.connection.insertOne(DTO, (err, doc) => {
                if (err) {
                    throw new Error('[Error UserDAO] Create User');
                }

                resolve(new UserDTO(doc.ops[0]));
            })
        );
    }
    read(): Promise<UserDTO[]> {
        return new Promise(resolve => {
            let UserDTOArray: UserDTO[] = [];
            const myCursor = this.connection.find();

            myCursor.forEach((doc: UserDTO) => {
                const parseDoc = new UserDTO(doc);
                UserDTOArray.push(parseDoc);
            }).then(_ => {    
                resolve(UserDTOArray);
            });

        }
        );
    }
    update(id: string, DTO: UserDTO): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    delete(DTO: UserDTO): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default new UserDAO(database.collection('user'));