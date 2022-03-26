import {extendType} from 'nexus';

export const QueryTest = extendType({
    type: 'Query',
    definition(t) {
        t.boolean('test', {
            resolve: () => true
        });
    }
});
