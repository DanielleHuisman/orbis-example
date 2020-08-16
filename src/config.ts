export const config = {
    port: parseInt(process.env.PORT || '', 10) || 5000,

    session: {
        secret: process.env.SESSION_SECRET || 'sessionSecret'
    },

    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
        username: process.env.DATABASE_USERNAME || 'example',
        password: process.env.DATABASE_PASSWORD || 'password',
        name: process.env.DATABASE_NAME || 'example'
    }
};
