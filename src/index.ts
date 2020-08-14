import {OrbisAuth} from '@orbis-framework/auth';

import {orbis} from './orbis';
import './entities';

orbis.addModules([
    new OrbisAuth({
        providers: {
            local: true,
            oauth: ['google']
        }
    })
]);

console.log(orbis);
