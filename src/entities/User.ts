import {Entity, PrimaryColumn} from 'typeorm';
import {setUserType, BaseUser} from '@orbis-framework/auth';

import {orbis} from '../orbis';

@orbis.Object()
@Entity()
export class User extends BaseUser {

    @orbis.Field()
    @PrimaryColumn()
    id: string;
}

setUserType(User);
