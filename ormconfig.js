module.exports = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port:  parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'example',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'example',
    synchronize: true,
    entities: [
        'node_modules/@orbis-framework/auth/dist/entities/*.js',
        'src/entities/**/*.ts'
    ],
    migrations: [
        'src/migrations/**/*.ts'
    ],
    subscribers: [
        'src/subscribers/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
    }
};
