import {auth} from '@orbis-framework/auth';

import {orbis} from './orbis';
import './entities';

console.log(orbis);
console.log(auth);

orbis.merge(auth);

console.log(orbis);
