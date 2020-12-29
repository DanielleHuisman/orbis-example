import {createServer} from '@danielhuisman/koa-base';
import {ApolloServer} from 'apollo-server-koa';

import {initializeAuthentication} from './authentication';
import {config, isDevelopment} from './config';
import {context} from './context';
import {User} from './entities';
import {schema} from './graphql';

export interface State {
    user?: User;
}

// Create server and application
const {server, app} = createServer<State>(config);

// Initialize authentication middleware
initializeAuthentication(app);

// Define CORS origins
const origins = [
    '://localhost:',
    '://127.0.0.0.1:'
];

// Initialize Apollo GraphQL server
const apollo = new ApolloServer({
    schema,
    tracing: isDevelopment,
    subscriptions: {},
    context
});

// Add Apollo GraphQL middleware
apollo.applyMiddleware({
    // TODO: figure out why Koa app context errors here
    // @ts-ignore
    app,
    path: '/graphql',
    cors: {
        allowMethods: ['GET', 'PUT', 'POST'],
        credentials: true,
        origin: (ctx) => {
            const origin = ctx.get('Origin');
            if (origins.some((o) => origin.includes(o))) {
                return origin;
            }
            return `http://localhost:${config.port}`;
        }
    }
});
apollo.installSubscriptionHandlers(server);

// Handle unknown routes
app.use(async (ctx, next) => {
    ctx.error(404, 'Not found');
    await next();
});

export {
    server,
    app
};
