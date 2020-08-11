import {Entity, PrimaryColumn} from 'typeorm';
import {setUserType, BaseUser} from '@orbis-framework/auth';

@Entity()
export class User extends BaseUser {

    @PrimaryColumn()
    id: string;
}

setUserType(User);
