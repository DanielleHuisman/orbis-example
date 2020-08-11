export const config = {
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
        username: process.env.DATABASE_USERNAME || 'example',
        password: process.env.DATABASE_PASSWORD || 'password',
        name: process.env.DATABASE_NAME || 'example'
    }
};