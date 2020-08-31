import {Entity, PrimaryColumn, Column} from 'typeorm';
import {setUserType, BaseUser} from '@orbis-framework/auth';

import {orbis} from '../orbis';

@orbis.Object()
@Entity()
export class User extends BaseUser {

    @orbis.Field()
    @PrimaryColumn()
    id: string;

    @orbis.Field()
    @Column({type: 'varchar', length: 255})
    name: string;

    @orbis.Field()
    @Column({type: 'varchar', length: 255})
    email: string;
}

setUserType(User);
